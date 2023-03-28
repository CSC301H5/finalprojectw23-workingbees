import AttendeeModel from '../models/attendeeModel.js';
import MatchingGroupModel from '../models/matchingGroupModel.js';
import SwarmModel from '../models/swarmModel.js';
import { removeElement, removeObject, getObject, getObjectIndex } from '../utils/arrayUtils.js';

// linearly transforms x in [0, b] to T(x) in [0, p]
const transform = (b, p, x) => (p/b) * x;

function getResponseValue(response) {
    if (response === "YES") {
        return 1;
    } else if (response === "NO") {
        return -2;
    } else {
        return 0;
    }
}

// defines a comparison function for ranking matchingGroups
function rank(obj1, obj2) {
    let responseValue = getResponseValue(obj1.response);
    let responseScore1 = getResponseValue(obj1.theirResponse) + responseValue;
    let responseScore2 = getResponseValue(obj2.theirResponse) + responseValue;

    if (responseScore1 > responseScore2) {
        return -1;
    } else if (responseScore1 < responseScore2) {
        return 1;
    } else {
        return obj2.score - obj1.score;
    }
}

// returns the number of hours selected in the timetable
function timeValue(timetable) {
    let total = 0;
    for (let i = 0; i < timetable.length; i++) {
        for (let j = 0; j < timetable[i].length; j++) {
            if (timetable[i][j] === 1) {
                total += 1;
            }
        }
    }
    return total;
}

// returns the number of selected hours shared by the two timetables
function intersection(timetable1, timetable2) {
    let total = 0;
    for (let i = 0; i < timetable1.length; i++) {
        for (let j = 0; j < timetable1[i].length; j++) {
            if (timetable1[i][j] === 1 && timetable2[i][j] === 1) {
                total += 1;
            }
        }
    }
    return total;
}

// returns a JSON object containing information about the attendee
async function getAttendeeData(hiveID, userID) {
    const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": userID});
    const data = {
        name: attendee.name,
        biography: attendee.biography,
        profilePicture: attendee.profilePicture
    }
    return data;
}

export async function getPendingRecommendations(hive, userMatchingGroup) {
    // check if calculation has to be made
    if (userMatchingGroup.recommended.length === 0) {
        // perform calculation
        const configOptions = JSON.parse(hive.configOptions);
        const userResponses = userMatchingGroup.hiveConfigResponses;
        const questions = configOptions.questions;
        const groupIDs = hive.groupIDs;
        removeElement(groupIDs, userMatchingGroup.groupID);
        const ranking = [];

        // for each matching group compute a compatibility score
        for (let i = 0; i < groupIDs.length; i++) {
            let matchingGroup = await MatchingGroupModel.findById(groupIDs[i]);
            let responses = matchingGroup.hiveConfigResponses;
            let score = 0;
            let total = 0;
            for (let j = 0; j < questions.length; j++) {
                let question = questions[j];
                let type = question.type;
                let p = question.priority;
                let b, x;

                /**
                 * If both have responded: match normally
                 * If only one has responded: the question counts but a score of 0 is given
                 * If neither has responded or matchMode is "NONE": skip the question
                 */
                if (question.matchMode !== "NONE" && (userResponses[j] !== "" || responses[j] !== "")) {
                    total += p;
                    if (userResponses[j] !== "" && responses[j] !== "") {
                        // type
                        if (type === "DROPDOWN") {
                            b = p;
                            x = (userResponses[j] === responses[j]) ? p : 0;
                        } else if (type === "MULTISELECT") {
                            b = Math.max(userResponses.length, responses.length);
                            x = userResponses.filter(value => responses.includes(value)).length;
                        } else if (type === "NUMBERLINE") {
                            b = question.typeOptions.max - question.typeOptions.min;
                            x = b - Math.abs(userResponses[j] - responses[j]);
                        } else if (type === "TIMETABLE") {
                            b = Math.max(timeValue(userResponses[j]), timeValue(responses[i]));
                            x = intersection(userResponses[j], responses[j]);
                        }

                        // matchMode
                        if (question.matchMode === "SIMILAR") {
                            score += transform(b, p, x);
                        } else if (question.matchMode === "DIVERSE") {
                            score += p - transform(b, p, x);
                        }
                    }
                }
            }

            // store matchingGroup data along with their score
            score = (total > 0) ? transform(total, 100, score) : 50;
            let users = [];
            let leaderData = await getAttendeeData(hive.hiveID, matchingGroup.leaderID);
            users.push(leaderData);
            for (var memberID in matchingGroup.memberIDs) {
                let memberData = await getAttendeeData(hive.hiveID, memberID);
                users.push(memberData);
            }

            ranking.push({matchingGroupID: groupIDs[i], users:users, configOptionsResponses: responses, score: score});
        }

        // sort recommendations in order of decreasing compatibility
        ranking.sort(rank);
        const recommendations = [];
        for (let i = 0; i < ranking.length; i++) {
            let data = {
                matchingGroupID: ranking[i].matchingGroupID,
                users: ranking[i].users,
                configOptionsResponses: ranking[i].configOptionsResponses
            }
            recommendations.push(data);
            userMatchingGroup.recommended.push({matchingGroupID: ranking[i].matchingGroupID, score: Number.parseFloat(ranking[i].score.toFixed(2))});
        }
        await userMatchingGroup.save();

        return recommendations;

    } else {

        const recommendations = [];
        const recommended = userMatchingGroup.recommended;
        for (let i = 0; i < recommended.length; i++) {
            if (!recommended[i].response) {
                let matchingGroup = await MatchingGroupModel.findById(recommended[i].matchingGroupID);
                let users = [];
                let leaderData = await getAttendeeData(hive.hiveID, matchingGroup.leaderID);
                users.push(leaderData);
                for (var memberID in matchingGroup.memberIDs) {
                    let memberData = await getAttendeeData(hive.hiveID, memberID);
                    users.push(memberData);
                }

                let data = {
                    matchingGroupID: recommended[i].matchingGroupID,
                    users: users,
                    configOptionsResponses: matchingGroup.hiveConfigResponses
                }
                recommendations.push(data)
            }
        }

        return recommendations;
    }
}

function updateScore(matchingGroup1, matchingGroup2, score) {
    let index1 = getObjectIndex(matchingGroup1.recommended, "matchingGroupID", matchingGroup2.groupID);
    let index2 = getObjectIndex(matchingGroup2.recommended, "matchingGroupID", matchingGroup1.groupID);
    matchingGroup1.recommended[index1].score = score;
    matchingGroup2.recommended[index2].score = score;
}

function updateResponse(matchingGroup1, matchingGroup2, response) {
    let index1 = getObjectIndex(matchingGroup1.recommended, "matchingGroupID", matchingGroup2.groupID);
    let index2 = getObjectIndex(matchingGroup2.recommended, "matchingGroupID", matchingGroup1.groupID);
    matchingGroup1.recommended[index1].response = response;
    matchingGroup2.recommended[index2].theirResponse = response;
}

function averageResponse(response1, response2) {
    if (response1 === response2) {
        return response1;
    } else if (response1 === "YES" && response2 === "NO" || response1 === "NO" && response2 === "YES") {
        return "MAYBE";
    } else if (response1 === "YES" || response2 === "YES") {
        return "YES";
    } else if (response1 === "NO" || response2 === "NO") {
        return "NO";
    }
}

function mergeGroups(hive, matchingGroups, matchingGroup1, matchingGroup2) {

    // merge matchingGroup2 -> matchingGroup1
    matchingGroup1.memberIDs = matchingGroup1.memberIDs.concat(matchingGroup2.memberIDs);
    matchingGroup1.memberIDs.push(matchingGroup2.leaderID);

    // average compatibility score and responses
    const matchingGroupsCopy = matchingGroups.map(x => x);
    removeObject(matchingGroupsCopy, "groupID", matchingGroup1.groupID);
    removeObject(matchingGroupsCopy, "groupID", matchingGroup2.groupID);
    for (let i = 0; i < matchingGroupsCopy.length; i++) {
        let obj1 = getObject(matchingGroupsCopy[i].recommended, "matchingGroupID", matchingGroup1.groupID);
        let obj2 = getObject(matchingGroupsCopy[i].recommended, "matchingGroupID", matchingGroup2.groupID);
        updateScore(matchingGroup1, matchingGroupsCopy[i], (obj1.score + obj2.score) / 2);
        updateResponse(matchingGroup1, matchingGroupsCopy[i], averageResponse(obj1.theirResponse, obj2.theirResponse));
        updateResponse(matchingGroupsCopy[i], matchingGroup1, averageResponse(obj1.response, obj2.response));
    }

    // remove from recommended
    removeObject(matchingGroups, "groupID", matchingGroup2.groupID);
    for (let i = 0; i < matchingGroups.length; i++) {
        removeObject(matchingGroups[i].recommended, "matchingGroupID", matchingGroup2.groupID);    
    }

    // delete matchingGroup2
    removeElement(hive.groupIDs, matchingGroup2.groupID);
    MatchingGroupModel.findByIdAndRemove(matchingGroup2.groupID, function (err) {
        if (err) console.log(err);
    });
}

export async function createSwarms(hive) {

    if (hive.swarmIDs.length === 0) {

        // get undersized groups
        const matchingGroups = [];
        const undersized = [];
        const configOptions = JSON.parse(hive.configOptions);
        for (let i = 0; i < hive.groupIDs.length; i++) {
            let matchingGroup = await MatchingGroupModel.findById(hive.groupIDs[i]);
            matchingGroups.push(matchingGroup);
            if (matchingGroup.memberIDs.length + 1 < configOptions.groupSizeRange[0]) {
                undersized.push(matchingGroup);
            }
        }

        // minimize number of swarms that are undersized
        while (undersized.length > 0 && hive.groupIDs.length > 1) {

            // for a given undersized matching group, find their preferred choice
            let matchingGroup = undersized.pop();
            matchingGroup.recommended.sort(rank);
            let optimalChoice = null;
            let i = 0;
            while (!optimalChoice && i < matchingGroup.recommended.length) {
                let otherMatchingGroup = getObject(matchingGroups, "groupID", matchingGroup.recommended[i].matchingGroupID);
                if (matchingGroup.memberIDs.length + otherMatchingGroup.memberIDs.length + 2 <= configOptions.groupSizeRange[1]) {
                    optimalChoice = otherMatchingGroup;
                }
                i++;
            }

            // merge the two groups if size allows
            if (optimalChoice) {
                mergeGroups(hive, matchingGroups, optimalChoice, matchingGroup);
            }

            // otherwise add matching group to the current smallest group
            else {
                let smallest = matchingGroups[0];
                for (let i = 1; i < matchingGroups.length; i++) {
                    if (matchingGroups[i].memberIDs.length < smallest.memberIDs.length) {
                        smallest = matchingGroups[i];
                    }
                }
                mergeGroups(hive, matchingGroups, smallest, matchingGroup);
            }
        }

        // merge groups that want to be together if size allows
        let k = 0;
        while (k < matchingGroups.length) {
            let matchingGroup = matchingGroups[k];
            matchingGroup.recommended.sort(rank);
            let optimalChoice = null;
            let i = 0;
            while (!optimalChoice && i < matchingGroup.recommended.length) {
                let responseScore = getResponseValue(matchingGroup.recommended[i].response) + getResponseValue(matchingGroup.recommended[i].theirResponse);
                if (responseScore > 0) {
                    let otherMatchingGroup = getObject(matchingGroups, "groupID", matchingGroup.recommended[i].matchingGroupID);
                    if (matchingGroup.memberIDs.length + otherMatchingGroup.memberIDs.length + 2 <= configOptions.groupSizeRange[1]) {
                        optimalChoice = otherMatchingGroup;
                    }
                }
                i++;
            }

            if (optimalChoice) {
                mergeGroups(hive, matchingGroups, matchingGroup, optimalChoice);
            } else {
                k++;
            }
        }

        // convert matchingGroups to swarms
        for (let i = 0; i < matchingGroups.length; i++) {
            // create swarm
            let swarm = new SwarmModel({
                hiveID: hive.hiveID,
                messages: []
            })
            swarm.memberIDs = matchingGroups[i].memberIDs.map(x => x);
            swarm.memberIDs.push(matchingGroups[i].leaderID);
            swarm.swarmID = swarm._id.toString();
            hive.swarmIDs.push(swarm.swarmID);
            await swarm.save();

            // update attendees within the swarm
            for (let j = 0; j < swarm.memberIDs.length; j++) {
                let attendee = await AttendeeModel.findOne({"hiveID": hive.hiveID, "userID": swarm.memberIDs[j]});
                attendee.groupID = "";
                attendee.swarmID = swarm.swarmID;
                await attendee.save();
            }

            // delete matchingGroup
            removeElement(hive.groupIDs, matchingGroups[i].groupID);
            MatchingGroupModel.findByIdAndRemove(matchingGroups[i].groupID, function (err) {
                if (err) console.log(err);
            });
        }

        await hive.save();
    }
}
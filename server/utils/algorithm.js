import AttendeeModel from '../models/attendeeModel.js';
import MatchingGroupModel from '../models/matchingGroupModel.js';
import { removeElement } from '../utils/arrayUtils.js';

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
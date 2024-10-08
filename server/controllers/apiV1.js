import UserModel from '../models/userModel.js';
import HiveModel from '../models/hiveModel.js';
import AttendeeModel from '../models/attendeeModel.js';
import HostModel from '../models/hostModel.js';
import MatchingGroupModel from '../models/matchingGroupModel.js';
import SwarmModel from '../models/swarmModel.js';
import { getUniqueCode, checkConfigOptions, checkConfigOptionsResponse } from '../utils/hiveUtils.js';
import { getSocketOfUser, broadcast, getSocketsInHive } from '../utils/wsutils.js';
import { getHiveFromDB, getHiveFromDBByID } from '../utils/dbUtils.js';
import { removeElement, getObjectIndex } from '../utils/arrayUtils.js';
import { getPendingRecommendations, createSwarms } from '../utils/algorithm.js';


import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// reference: https://dev.to/jeffreythecoder/setup-jwt-authentication-in-mern-from-scratch-ib4
export const register = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    // verify request
    if (!email || !password) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // check if user already exists.
        let user = await UserModel.findOne({"email": email});
        if (user) {
            return res.status(409).json({msg: "Error: User already exists."});
        }

        // create user
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        user = new UserModel({
            email: email,
            password: hashed,
            isGuest: false
        });

        user.userID = user._id.toString();
        await user.save();

        // jwt
        const payload = {
            userID: user.userID
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3 days' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({token});
            }
        )
    } catch (e) {
        console.error("Error on register controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}


export const login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // verify request (can add regex)
    if (!email || !password) {
        // error
        return res.status(400).json({msg: "Malformed request."});
    }

    // verify credentials
    try {
        let user = await UserModel.findOne({"email": email});
        if (!user) {
            return res.status(401).json({msg: "Error: Email or password incorrect"});
        }

        const matchFound = await bcrypt.compare(password, user.password);
        if (!matchFound) {
            return res.status(401).json({msg: "Error: Email or password incorrect"});
        }

        // auth success; grant token
        const payload = {
            userID: user.userID
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3 days' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({token});
            }
        )

    } catch (e) {
        console.error("Error on login controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}


export const guestRegister = async (req, res) => {

    try {

        // create guest user
        var user = new UserModel({
            email: "",
            password: "",
            isGuest: true
        });

        user.userID = user._id.toString();
        await user.save();

        // jwt
        const payload = {
            userID: user.userID
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30 days' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({token});
            }
        )
    } catch (e) {
        console.error("Error on register controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const joinHive = async (req, res) => {

    let code = req.body.code;
    let profilePicture = req.body.profilePicture;
    let displayName = req.body.displayName;
    let biography = req.body.biography;

    // verify request
    if (!code || !profilePicture || !displayName || !biography) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // check if the code corresponds to an existing hive
        let hive = await getHiveFromDB({"code": code});
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // only phase 0 allows joining
        if (hive.phase !== 0) {
            return res.status(409).json({msg: "Error: You may only join a hive in phase 0."});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // check that the user is not the host themself
        if (user.userID === hive.hostID) {
            return res.status(409).json({msg: "Error: User is already the host of this hive."});
        }

        // check if attendee name already exists or the user is already in the hive
        for (let i = 0; i < hive.attendeeIDs.length; i++) {
            let attendee = await AttendeeModel.findOne({"userID": hive.attendeeIDs[i]});
            if (attendee.name === displayName) {
                return res.status(409).json({msg: "Error: Attendee name already exists in this hive."});
            }
            if (attendee.userID === user.userID) {
                return res.status(409).json({msg: "Error: User is already an attendee in this hive."});
            }
        }

        // create attendee
        let attendee = new AttendeeModel({
            hiveID: hive.hiveID,
            name: displayName,
            biography: biography,
            profilePicture: profilePicture,
            swarmID: "",
            pendingInvites: []
        })

        // create matchingGroup
        let matchingGroup = new MatchingGroupModel({
            hiveID: hive.hiveID,
            leaderID: user.userID,
        })

        // initalize hiveConfigResponses to no response
        const configOptions = JSON.parse(hive.configOptions);
        for (let j = 0; j < configOptions.questions.length; j++) {
            matchingGroup.hiveConfigResponses.push("");
        }

        matchingGroup.groupID = matchingGroup._id.toString();
        await matchingGroup.save();

        attendee.userID = user.userID;
        attendee.groupID = matchingGroup.groupID;
        await attendee.save();

        // add attendee to hive
        hive.attendeeIDs.push(attendee.userID);
        hive.groupIDs.push(matchingGroup.groupID);
        await hive.save();

        // update user's hives
        user.hiveIDs.push(hive.hiveID);
        await user.save();

        // notify the host that a user has joined
        let hostSocket = getSocketOfUser(hive.hostID);
        if (hostSocket) {
            hostSocket.send(`{"event": "USER_JOIN", "username": "${attendee.name}"}`);
        }

        return res.status(201).json({hiveID: hive.hiveID});

    } catch (e) {
        console.error("Error on joinHive controller!");
        console.error(e.message);
        console.error(e.status);
        res.status(500).json({msg: "Server Error."});
    }
}

export const createHive = async (req, res) => {

    let profilePicture = req.body.profilePicture;
    let displayName = req.body.displayName;
    let hiveName = req.body.hiveName;
    let configOptions = req.body.configOptions;
    let code = await getUniqueCode();
    // verify request
    if (!displayName || !profilePicture || !hiveName || !configOptions) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // check config options
        let configRes = await checkConfigOptions(req, res);
        if (configRes) {
            return;
        }

        // create host
        let host = new HostModel({
            name: displayName,
            profilePicture: profilePicture
        });

        // create new hive
        let hive = new HiveModel({
            name: hiveName,
            code: code,
            attendeeIDs: [],
            groupIDs: [],
            swarmIDs: [],
            phase: 0,
            configOptions: JSON.stringify(configOptions)
        });

        // link host and hive through mutual access of ids
        host.userID = user.userID;
        hive.hiveID = hive._id.toString();
        host.hiveID = hive.hiveID;
        hive.hostID = host.userID;
        await host.save();
        await hive.save();

        // update user's hives
        user.hiveIDs.push(hive.hiveID);
        await user.save();

        return res.status(200).json({code: hive.code, hiveID: host.hiveID});

    } catch (e) {
        console.error("Error on createHive controller!");
        console.error(e.message);
        console.error(e.status);
        res.status(500).json({msg: "Server Error."});
    }
}

export const getHiveAttendeeNames = async (req, res) => {

    let hiveID = req.query.hiveID;

    // verify request
    if (!hiveID) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try and find hive
        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        // get attendee names
        const attendeeNames = [];
        for (let i = 0; i < hive.attendeeIDs.length; i++) {
            let attendee = await AttendeeModel.findOne({"userID": hive.attendeeIDs[i]});
            attendeeNames.push(attendee.name);
        }

        return res.status(200).json({attendeeNames: attendeeNames});

    } catch (e) {
        console.error("Error on getHiveAttendeeNames controller!");
        console.error(e.message);
        console.error(e.status);
        res.status(500).json({msg: "Server Error."});
    }
}

export const getUserHives = async (req, res) => {
    // uses token and returns (for every hive the user is in): hiveID, isHost, phase, teamsize (is set to 1 for now by default, will be updated in groupmaking sprints.)

    try {
        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        var acc = {};
        for (var i=0; i < user.hiveIDs.length; i++) {
            var hive = await getHiveFromDBByID(user.hiveIDs[i]);
            if (!hive) {
                console.error("Error on getUserHives: invalid hive ID stored in db for userID " + user.userID);
                return res.status(500).json({ msg:"Server Error." });
            }
            var isHost = (user.userID === hive.hostID);
            var temp = {
                "name": hive.name,
                "isHost": isHost,
                "phase": hive.phase,
                "teamSize": 1
            }
            acc[hive.hiveID] = temp;
        }

        return res.status(200).json(acc);

    } catch (e) {
        console.error("Error on getUserHives controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getHivePhase = async (req, res) => {

    try {

        if (!req.query.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.query.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }
        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        const data = {"phase": hive.phase};

        return res.status(200).json(data);

    } catch (e) {
        console.error("Error on getHivePhase controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getHiveTimer = async (req, res) => {

    try {

        if (!req.query.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.query.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        // only phase 0 and 1 have timers available.
        if (hive.phase === 2) {
            return res.status(409).json({msg: "Error: No timer available for hive in phase 2."});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        const configOptions = JSON.parse(hive.configOptions);
        const data = {"phaseCompletionDate": configOptions.phaseChangeDates[hive.phase]};

        return res.status(200).json(data);

    } catch (e) {
        console.error("Error on getHiveTimer controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getHiveInfo = async (req, res) => {

    try {

        if (!req.query.code) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDB({"code": req.query.code});
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found."});
        }

        const configOptions = JSON.parse(hive.configOptions);

        const data = {
            "hiveName": hive.name,
            "phase": hive.phase,
            "phaseCompletionDate": configOptions.phaseChangeDates[hive.phase]
        };

        return res.status(200).json(data);

    } catch (e) {
        console.error("Error on getHiveInfo controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}


export const getMatchingGroup = async (req, res) => {

    try {

        if (!req.query.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.query.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        // ensure they are not the host
        const attendee = await AttendeeModel.findOne({"hiveID": req.query.hiveID, "userID": req.userID}); // need to get their attendee instance in the correct hive.
        if (!attendee) {
            return res.status(409).json({msg: "Not an attendee in the specified hive."})
        }

        // get matchingGroup
        const matchingGroup = await MatchingGroupModel.findById(attendee.groupID);
        if (!matchingGroup) { // this should always exist if the user exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        const data = {}
        // add leader
        const leader = await AttendeeModel.findOne({"userID": matchingGroup.leaderID});
        data["leaderName"] = leader.name;

        // add username
        data["userName"] = attendee.name;

        // add member names
        const memberNames = [];
        for (let i = 0; i < matchingGroup.memberIDs.length; i++) {
            let member = await AttendeeModel.findOne({"userID": matchingGroup.memberIDs[i]});
            memberNames.push(member.name);
        }
        data["members"] = memberNames;

        res.status(200).json(data);

    } catch (e) {
        console.error("Error on getMatchingGroup controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const roomConfigOptionsCompleted = async (req, res) => {

    try {

        if (!req.query.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg: "Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.query.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        // ensure they are not the host
        const attendee = await AttendeeModel.findOne({"hiveID": req.query.hiveID, "userID": req.userID}); // need to get their attendee instance in the correct hive.
        if (!attendee) {
            return res.status(409).json({msg: "Not an attendee in the specified hive."})
        }

        // get matchingGroup
        const matchingGroup = await MatchingGroupModel.findById(attendee.groupID);
        if (!matchingGroup) { // this should always exist if the user exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        // check if they are filled out (default value is "")
        const data = {};
        data["completed"] = matchingGroup.hiveConfigResponses === "" ? false : true
        res.status(200).json(data);

    } catch (e) {
        console.error("Error on roomConfigOptionsCompleted controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getIncomingInvites = async (req, res) => {

    try {

        if (!req.query.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg: "Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.query.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        // only phase 0 allows invites
        if (hive.phase !== 0) {
            return res.status(409).json({msg: "Error: Invites only exist in phase 0."});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        // ensure they are not the host implicitly
        const attendee = await AttendeeModel.findOne({"hiveID": req.query.hiveID, "userID": req.userID}); // need to get their attendee instance in the correct hive.
        if (!attendee) {
            return res.status(409).json({msg: "Not an attendee in the specified hive."})
        }

        const data = {}
        // put leaderName: matchingGroupID pairs in data.

        for (let i = 0; i < attendee.pendingInvites.length; i++) {
            let matchingGroup = await MatchingGroupModel.findById(attendee.pendingInvites[i]);
            if (!matchingGroup) { // this should exist, so something went wrong.
                return res.status(500).json({msg: "Server Error."});
            }
            let leader = await AttendeeModel.findOne({"userID": matchingGroup.leaderID});
            if (!leader) { // should exist
                return res.status(500).json({msg: "Server Error."});
            }

            data[leader.name] = matchingGroup.groupID;
        }

        res.status(200).json(data);

    } catch (e) {
        console.error("Error on getIncomingInvites controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getOutgoingInvites = async (req, res) => {

    try {

        if (!req.query.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.query.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        // only phase 0 allows invites
        if (hive.phase !== 0) {
            return res.status(409).json({msg: "Error: Invites only exist in phase 0."});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }

        // ensure they are not the host implicitly
        const attendee = await AttendeeModel.findOne({"hiveID": req.query.hiveID, "userID": req.userID}); // need to get their attendee instance in the correct hive.
        if (!attendee) {
            return res.status(409).json({msg: "Not an attendee in the specified hive."})
        }

        // get matchingGroup
        const matchingGroup = await MatchingGroupModel.findById(attendee.groupID);
        if (!matchingGroup) { // this should always exist if the user exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        const data = {}
        // put leaderName: matchingGroupID pairs in data.

        for (let i = 0; i < matchingGroup.outgoingInvites.length; i++) {
            let targetUser = await AttendeeModel.findOne({"userID": matchingGroup.outgoingInvites[i]});
            if (!targetUser) { // should exist
                return res.status(500).json({msg: "Server Error."});
            }

            data[targetUser.name] = targetUser.userID;
        }

        res.status(200).json(data);

    } catch (e) {
        console.error("Error on getOutgoingInvites controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const sendInvite = async (req, res) => {
    let hiveID = req.body.hiveID;
    let username = req.body.username;

    // verify request
    if (!hiveID || !username) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try to find user and hive and check that the user is an attendee in this hive
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // only phase 0 allows invites
        if (hive.phase !== 0) {
            return res.status(409).json({msg: "Error: Invites only exist in phase 0."});
        }

        const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": user.userID});
        if (!attendee) {
            return res.status(401).json({msg: "User must be an attendee of this hive"});
        }

        // try and find invited user
        let invitedAttendee = await AttendeeModel.findOne({"hiveID": hiveID, "name": username});
        if (!invitedAttendee) {
            return res.status(404).json({msg: "Error: Username not found"});
        }

        const invitedUser = await UserModel.findById(invitedAttendee.userID);
        if (!invitedUser) { // each attendee should have a registered userID, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        // check if user is already part of your matching group or has already been invited
        let matchingGroup = await MatchingGroupModel.findById(attendee.groupID);
        if (!matchingGroup) { // this should always exist if the user exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        if (matchingGroup.memberIDs.includes(invitedUser.userID) || matchingGroup.leaderID == invitedUser.userID) {
            return res.status(409).json({msg: "User is already part of your matching group"});
        }

        if (matchingGroup.outgoingInvites.includes(invitedUser.userID)) {
            return res.status(409).json({msg: "User has already been invited"});
        }

        // check if your matching group is already the largest it can be
        const configOptions = JSON.parse(hive.configOptions);
        const max = configOptions.groupSizeRange[1];
        if (matchingGroup.memberIDs.length === max - 1) {
            return res.status(409).json({msg: "Matching group is already the largest it can be"})
        }

        // check that the inviting user is the leader of the matching group
        if (user.userID !== matchingGroup.leaderID) {
            return res.status(401).json({msg: "User must be the leader of the matching group"})
        }

        // notify the invited user if they are active
        let invitedUserSocket = getSocketOfUser(invitedUser.userID);
        if (invitedUserSocket) {
            invitedUserSocket.send(`{"event": "NEW_INVITE", "leaderName": "${attendee.name}", "matchingGroupID": "${matchingGroup.groupID}"}`);
        }

        // notify the user if they are active
        let userSocket = getSocketOfUser(user.userID);
        if (userSocket) {
            userSocket.send(`{"event": "INVITE_SENT", "username": "${username}"}`);
        }

        // send the invitation and update invitation status
        matchingGroup.outgoingInvites.push(invitedUser.userID);
        invitedAttendee.pendingInvites.push(matchingGroup.groupID);
        await matchingGroup.save();
        await invitedAttendee.save();

        return res.status(200).json();

    } catch (e) {
        console.error("Error on sendInvite controller!");
        console.error(e.message);
        console.error(e.status);
        res.status(500).json({msg: "Server Error."});
    }
}

export const acceptInvite = async (req, res) => {
    let hiveID = req.body.hiveID;
    let matchingGroupID = req.body.matchingGroupID

    // verify request
    if (!hiveID || !matchingGroupID) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try to find user and hive and check that the user is an attendee in this hive
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // only phase 0 allows invites
        if (hive.phase !== 0) {
            return res.status(409).json({msg: "Error: Invites only exist in phase 0."});
        }

        if (!hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({msg: "User must be an attendee of this hive"});
        }

        // try and find the inviting matching group
        let matchingGroup = await MatchingGroupModel.findById(matchingGroupID);
        if (!matchingGroup) {
            return res.status(404).json({msg: "Error: Matching group not found"});
        }

        // check that the invitation exists
        let invitedAttendee = await AttendeeModel.findOne({"userID": user.userID});
        if (!invitedAttendee) { // this should always exist if the userID is in attendeeIDs, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        if (!invitedAttendee.pendingInvites.includes(matchingGroupID)) {
            return res.status(409).json({msg: "User does not have a pending invitation from this matching group"});
        }

        // notify members of the matching group if they are active
        broadcast(hiveID, matchingGroup, `{"event": "INVITE_ACCEPTED", "username": "${invitedAttendee.name}"}`);

        // accept the invitation and update invitation status
        if (!removeElement(matchingGroup.outgoingInvites, user.userID)) { // this should always exist if pending invite exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server error"})
        }
        removeElement(invitedAttendee.pendingInvites, matchingGroupID);

        // remove user from their old matching group
        let originalMatchingGroup = await MatchingGroupModel.findById(invitedAttendee.groupID);
        if (!originalMatchingGroup) { // this should always exist if the user exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        // check if leader was removed
        if (!removeElement(originalMatchingGroup.memberIDs, user.userID)) {
            // Remove original matching group if user was the only member and promote a member to leader otherwise
            if (originalMatchingGroup.memberIDs.length == 0) {
                removeElement(hive.groupIDs, originalMatchingGroup.groupID);
                MatchingGroupModel.findByIdAndRemove(originalMatchingGroup.groupID, function (err) {
                    if (err) console.log(err);
                });
                await hive.save();
            } else {
                originalMatchingGroup.leaderID = originalMatchingGroup.memberIDs[0];
                originalMatchingGroup.memberIDs.shift();
                await originalMatchingGroup.save();
            }
        }

        // add user to their new matching group
        invitedAttendee.groupID = matchingGroupID;
        matchingGroup.memberIDs.push(user.userID);
        await invitedAttendee.save();

        // remove all remaining invitations sent by the matching group if it is now full
        const configOptions = JSON.parse(hive.configOptions);
        const max = configOptions.groupSizeRange[1];
        if (matchingGroup.memberIDs.length === max - 1) {
            let numInvitesSent = matchingGroup.outgoingInvites.length;
            for (let i = 0; i < numInvitesSent; i++) {
                // update invitation status
                let invitedID = matchingGroup.outgoingInvites.pop();
                let invitedAttendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": invitedID});
                removeElement(invitedAttendee.pendingInvites, matchingGroupID);
                await invitedAttendee.save();

                // notify previously invited attendees if they are active
                let invitedUserSocket = getSocketOfUser(invitedID);
                if (invitedUserSocket) {
                    let leader = await AttendeeModel.findOne({"hiveID": hiveID, "userID": matchingGroup.leaderID});
                    invitedUserSocket.send(`{"event": "INVITE_CANCELED", "leaderName": "${leader.name}"}`);
                }
            }
        }

        await matchingGroup.save();

        return res.status(200).json();

    } catch (e) {
        console.error("Error on acceptInvite controller!");
        console.error(e.message);
        console.error(e.status);
        res.status(500).json({msg: "Server Error."});
    }
}

export const rejectInvite = async (req, res) => {
    let hiveID = req.body.hiveID;
    let matchingGroupID = req.body.matchingGroupID

    // verify request
    if (!hiveID || !matchingGroupID) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try to find user and hive and check that the user is an attendee in this hive
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // only phase 0 allows invites
        if (hive.phase !== 0) {
            return res.status(409).json({msg: "Error: Invites only exist in phase 0."});
        }

        if (!hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({msg: "User must be an attendee of this hive"});
        }

        // try and find the inviting matching group
        let matchingGroup = await MatchingGroupModel.findById(matchingGroupID);
        if (!matchingGroup) {
            return res.status(404).json({msg: "Error: Matching group not found"});
        }

        // check that the invitation exists
        let invitedAttendee = await AttendeeModel.findOne({"userID": user.userID});
        if (!invitedAttendee) { // this should always exist if the userID is in attendeeIDs, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        if (!invitedAttendee.pendingInvites.includes(matchingGroupID)) {
            return res.status(409).json({msg: "User does not have a pending invitation from this matching group"})
        }

        // notify members of the matching group if they are active
        broadcast(hiveID, matchingGroup, `{"event": "INVITE_REJECTED", "username": "${invitedAttendee.name}"}`);

        // notify the user if they are active
        let userSocket = getSocketOfUser(user.userID);
        if (userSocket) {
            const leader = await AttendeeModel.findOne({"hiveID": hiveID, "userID": matchingGroup.leaderID});
            userSocket.send(`{"event": "INVITE_CANCELED", "leaderName": "${leader.name}"}`);
        }

        // reject the invitation and update invitation status
        if (!removeElement(matchingGroup.outgoingInvites, user.userID)) { // this should always exist if pending invite exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server error"})
        }
        removeElement(invitedAttendee.pendingInvites, matchingGroupID);

        await matchingGroup.save();
        await invitedAttendee.save();

        return res.status(200).json();

    } catch (e) {
        console.error("Error on rejectInvite controller!");
        console.error(e.message);
        console.error(e.status);
        res.status(500).json({msg: "Server Error."});
    }
}

export const getRoomConfigOptions = async(req, res) => {


    let hiveID = req.query.hiveID;

    // verify request
    if (!hiveID) {
        return res.status(400).json({msg: "Malformed request."});

    }

    try {
        // try and find hive
        const hive = await getHiveFromDBByID(req.query.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        return res.status(200).json(JSON.parse(hive.configOptions));

    } catch (e) {
        console.error("Error on getRoomConfigOptions controller!");
        console.error(e.message);
        console.error(e.stack);
        res.status(500).json({msg: "Server Error."});
    }
}

export const submitRoomConfigOptions = async(req, res) => {

    let hiveID = req.body.hiveID;
    let responses = req.body.responses;

    // verify request
    if (!hiveID || (!responses && responses !== [])) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try and find user and hive and check that the user is an attendee in this hive
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // only phase 0 allows group property modifications
        if (hive.phase !== 0) {
            return res.status(409).json({msg: "Error: You may only submit responses in phase 0."});
        }

        const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": user.userID});
        if (!attendee) {
            return res.status(401).json({msg: "User must be an attendee of this hive"});
        }

        // get matching group of the user and ensure the user is the leader
        let matchingGroup = await MatchingGroupModel.findById(attendee.groupID);
        if (!matchingGroup) { // this should always exist if the user exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        if (user.userID !== matchingGroup.leaderID) {
            return res.status(401).json({msg: "User must be the leader of the matching group"});
        }

        // check if a response has already been submitted
        const configOptions = JSON.parse(hive.configOptions);
        for (let i = 0; i < configOptions.questions.length; i++) {
            if (matchingGroup.hiveConfigResponses[i] !== "") {
                return res.status(409).json({msg: "Matching group response has already been submitted"});
            }
        }

        // check configOptionsResponse is valid
        let configRes = await checkConfigOptionsResponse(hive, responses, res);
        if (configRes) {
            return;
        }

        // save and submit matching group response
        matchingGroup.hiveConfigResponses = responses;
        await matchingGroup.save();

        // send an update to the host
        let hostSocket = getSocketOfUser(hive.hostID);
        if (hostSocket) {
            hostSocket.send('{"event": "GROUP_PROFILE_CREATED"}');
        }

        return res.status(200).json();

    } catch (e) {
        console.error("Error on submitRoomConfigOptions controller!");
        console.error(e.message);
        console.error(e.stack);
        res.status(500).json({msg: "Server Error."});
    }
}

export const getHiveMatchingGroupCompletion = async (req, res) => {

    try {

        if (!req.query.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.query.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID != user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        var acc = 0; // increment for each matchingGroup that's submitted data.

        for (let i = 0; i < hive.groupIDs.length; i++) {
            let matchingGroup = await MatchingGroupModel.findById(hive.groupIDs[i]);
            if (!matchingGroup) { // this should always exist if the id is in groupIDs, so something is wrong with DB state.
                return res.status(500).json({msg: "Server Error."});
            }
            if (matchingGroup.hiveConfigResponses !== "") { // i.e. data has been submitted
                acc += 1;
            }
        }

        res.status(200).json({"completed": acc});

    } catch (e) {
        console.error("Error on getHiveMatchingGroupCompletion controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getUserDisplayName = async(req, res) => {

    let hiveID = req.query.hiveID;

    // verify request
    if (!hiveID) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try and find hive
        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // determine whether the user is an attendee or host in the hive
        const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": user.userID});
        const host = await HostModel.findOne({"hiveID": hiveID, "userID": user.userID});
        if (!attendee && !host) {
            return res.status(401).json({msg: "User must be an attendee or host of this hive"});
        }

        if (attendee && host) { // the user can only have one role in the hive, so something went terribly wrong
            return res.status(500).json({msg: "Server Error."});
        }

        if (attendee) {
            return res.status(200).json({"name": attendee.name});
        } else {
            return res.status(200).json({"name": host.name});
        }

    } catch (e) {
        console.error("Error on getUserDisplayName controller!");
        console.error(e.message);
        console.error(e.stack);
        res.status(500).json({msg: "Server Error."});
    }
}

export const beginPhaseOne = async (req, res) => {

    try {

        if (!req.body.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.body.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }

        // ensure they are host
        const host = await HostModel.findOne({"hiveID": req.body.hiveID, "userID": user.userID});
        if (!host) {
            return res.status(409).json({msg: "Not the host of the specified hive."})
        }

        // ensure phase one can be begun (is in phase 0)
        if (hive.phase !== 0) {
            return res.status(409).json({msg: "Hive is not in phase 0."});
        }

        // update hive
        hive.phase = 1;
        await hive.save();

        // notify all clients of change
        let clients = getSocketsInHive(hive.hiveID);
        for (var key in clients) {
            clients[key].send('{"event": "PHASE_SKIP", "newPhase": 1}');
        }

        res.status(200).json();

    } catch (e) {
        console.error("Error on beginPhaseOne controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getPendingMatchingGroupRecommendations = async(req, res) => {

    let hiveID = req.query.hiveID;

    // verify request
    if (!hiveID) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try and find hive
        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // only phase 1 allows recommendations
        if (hive.phase !== 1) {
            return res.status(409).json({msg: "Error: Recommendations only exist in phase 1."});
        }

        // check that the user is an attendee in this hive and get their matching group
        const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": user.userID});
        if (!attendee) {
            return res.status(401).json({msg: "User must be an attendee of this hive"});
        }

        let userMatchingGroup = await MatchingGroupModel.findById(attendee.groupID);
        if (!userMatchingGroup) { // this should always exist if the user exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        const recommendations = await getPendingRecommendations(hive, userMatchingGroup);
        return res.status(200).json({recommendations: recommendations});

    } catch (e) {
        console.error("Error on getPendingMatchingGroupRecommendations controller!");
        console.error(e.message);
        console.error(e.stack);
        res.status(500).json({msg: "Server Error."});
    }
}

export const getMatchingGroupsDonePhaseOne = async(req, res) => {

    let hiveID = req.query.hiveID;

    // verify request
    if (!hiveID) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try and find hive
        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg: "Permission denied." });
        }

        // only phase 1 has matching groups
        if (hive.phase !== 1) {
            return res.status(409).json({msg: "Error: Matching groups only exist in phase 1."});
        }

        let completed = 0;
        for (let i = 0; i < hive.groupIDs.length; i++) {
            let matchingGroup = await MatchingGroupModel.findById(hive.groupIDs[i]);
            let numPending = 0;
            for (let j = 0; j < matchingGroup.recommended.length; j++) {
                if (!matchingGroup.recommended[j].response) {
                    numPending++;
                }
            }
            if (numPending === 0) {
                completed++;
            }
        }

        return res.status(200).json({completed: completed});

    } catch (e) {
        console.error("Error on getMatchingGroupsDonePhaseOne controller!");
        console.error(e.message);
        console.error(e.stack);
        res.status(500).json({msg: "Server Error."});
    }
}

export const respondToMatchingGroupRecommendation = async(req, res) => {
    
    let hiveID = req.body.hiveID;
    let matchingGroupID = req.body.matchingGroupID;
    let response = req.body.response;

    // verify request
    if (!hiveID || !matchingGroupID || !response) {
        console.log("hiveID ", hiveID);
        console.log("matchingGroupID ", matchingGroupID);
        console.log("response ", response);
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try and find hive
        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // only phase 1 has matching groups
        if (hive.phase !== 1) {
            return res.status(409).json({msg: "Error: Matching groups only exist in phase 1."});
        }

        // check that the user is an attendee in this hive and get their matching group
        const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": user.userID});
        if (!attendee) {
            return res.status(401).json({msg: "User must be an attendee of this hive"});
        }

        const userMatchingGroup = await MatchingGroupModel.findById(attendee.groupID);
        if (!userMatchingGroup) { // this should always exist if the user exists, so something went terribly wrong.
            return res.status(500).json({msg: "Server Error."});
        }

        // check that the responding user is the leader of the matching group
        if (user.userID !== userMatchingGroup.leaderID) {
            return res.status(401).json({msg: "User must be the leader of the matching group"})
        }

        // check if the given matchingGroupID exists in the hive
        if (!hive.groupIDs.includes(matchingGroupID)) {
            return res.status(404).json({msg: "Error: Matching group not found"});
        }

        // check that the given response is valid
        if (response !== "YES" && response !== "NO" && response !== "MAYBE") {
            return res.status(400).json({msg: "Response must be either YES, NO, or MAYBE"});
        }

        // check if the matchingGroup is pending and not yet responded
        const index = getObjectIndex(userMatchingGroup.recommended, "matchingGroupID", matchingGroupID);
        if (index === -1) {
            return res.status(404).json({msg: "Could not find matching group in pending recommendations"});
        } else if (userMatchingGroup.recommended[index].response) {
            return res.status(409).json({msg: "Response has already been recorded"});
        }

        // mark recommendation as responded
        userMatchingGroup.recommended[index].response = response;
        userMatchingGroup.recommended[index] = Object.assign({}, userMatchingGroup.recommended[index]);
        await userMatchingGroup.save();

        const matchingGroup = await MatchingGroupModel.findById(matchingGroupID);
        const otherIndex = getObjectIndex(matchingGroup.recommended, "matchingGroupID", userMatchingGroup.groupID);
        matchingGroup.recommended[otherIndex].theirResponse = response;
        matchingGroup.recommended[otherIndex] = Object.assign({}, matchingGroup.recommended[otherIndex]);
        await matchingGroup.save();

        // notify host if matching group has finished responding to recommendations
        let numPending = 0;
        for (let i = 0; i < userMatchingGroup.recommended.length; i++) {
            if (!userMatchingGroup.recommended[i].response) {
                numPending++;
            }
        }

        if (numPending === 0) {
            let hostSocket = getSocketOfUser(hive.hostID);
            if (hostSocket) {
                hostSocket.send('{"event": "GROUP_DONE_RESPONDING"}');
            }
        }

        return res.status(200).json();

    } catch (e) {
        console.error("Error on respondToMatchingGroupRecommendation controller!");
        console.error(e.message);
        console.error(e.stack);
        res.status(500).json({msg: "Server Error."});
    }
}

export const getSwarmInfo = async (req, res) => {

    try {

        let hiveID = req.query.hiveID;

        if (!hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        if (hive.phase !== 2) {
            return res.status(409).json({msg: "Error: Swarms only exist in phase 2."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }

        const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": user.userID});
        if (!attendee) {
            return res.status(401).json({msg: "User must be an attendee of this hive"});
        }

        const swarm = await SwarmModel.findById(attendee.swarmID);
        if (!swarm) { // failed to find swarm
            return res.status(404).json({ msg:"Error: Swarm not found" });
        }

        const data = {
            "swarmID": attendee.swarmID,
            "members": []
        };

        for (let i = 0; i < swarm.memberIDs.length; i++) {
            let member = await await AttendeeModel.findOne({"hiveID": hiveID, "userID": swarm.memberIDs[i]});
            data.members.push({
                "name": member.name, 
                "biography": member.biography, 
                "profilePicture": member.profilePicture
            });
        }

        return res.status(200).json(data);

    } catch (e) {
        console.error("Error on getSwarmInfo controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getAllSwarms = async (req, res) => {

    try {

        let hiveID = req.query.hiveID;

        if (!hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        if (hive.phase !== 2) {
            return res.status(409).json({msg: "Error: Swarms only exist in phase 2."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }

        

        const data = {};

        for (let i = 0; i < hive.swarmIDs.length; i++) {
            let swarm = await SwarmModel.findById(hive.swarmIDs[i]);
            data[swarm.swarmID] = swarm.memberIDs.length;
            console.log(data)
        }
        return res.status(200).json(data);

    } catch (e) {
        console.error("Error on getAllSwarms controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const beginPhaseTwo = async (req, res) => {

    try {

        if (!req.body.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.body.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }

        // ensure they are host
        const host = await HostModel.findOne({"hiveID": req.body.hiveID, "userID": user.userID});
        if (!host) {
            return res.status(409).json({msg: "Not the host of the specified hive."})
        }

        // ensure phase two can be begun (is in phase 1)
        if (hive.phase !== 1) {
            return res.status(409).json({msg: "Hive is not in phase 1."});
        }

        // update hive
        hive.phase = 2;
        await hive.save();
        await createSwarms(hive);

        // notify all clients of change
        let clients = getSocketsInHive(hive.hiveID);
        for (var key in clients) {
            clients[key].send('{"event": "PHASE_SKIP", "newPhase": 2}');
        }

        res.status(200).json();

    } catch (e) {
        console.error("Error on beginPhaseTwo controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const sendSwarmChatMessage = async (req, res) => {

    try {

        let hiveID = req.body.hiveID;
        let swarmID = req.body.swarmID;
        let message = req.body.message;

        if (!hiveID || !swarmID || !message) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await getHiveFromDBByID(req.body.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }

        if (hive.phase !== 2) {
            return res.status(409).json({msg: "Error: Swarms only exist in phase 2."});
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }

        // attendee can only check their own swarm. host can check any.
        const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": user.userID});
        const host = await HostModel.findOne({"hiveID": hiveID, "userID": user.userID});
        if (attendee && attendee.swarmID !== swarmID) { // attendee exists but is not in this swarm
            console.log(attendee.swarmID, swarmID);
            console.log(user.userID);
            return res.status(401).json({msg: "You are not permitted to access that swarmID."});
        } 

        // get sender name for the message
        let sendername;
        if (attendee) {
            sendername = attendee.name;
        } else {
            sendername = host.name;
        }

        const swarm = await SwarmModel.findById(swarmID);
        if (!swarm) { // failed to find swarm
            return res.status(404).json({ msg:"Error: Swarm not found." });
        }
        
        let data = {
            "sender": sendername,
            "message": message,
            "timestamp": Date().toString()
        }

        // update swarm
        swarm.messages.push(data)
        await swarm.save();

        data["event"] = "NEW_CHAT_MESSAGE";

        // notify all clients in swarm of new message
        let sockets = getSocketsInHive(hiveID);
        for (var key in sockets) {
            if (swarm.memberIDs.includes(key) || key == hive.hostID) {
                sockets[key].send(JSON.stringify(data));
            }
        }

        res.status(200).json();

    } catch (e) {
        console.error("Error on sendSwarmChatMessage controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

export const getSwarmChatHistory = async (req, res) => {

    try {

        let hiveID = req.query.hiveID;
        let swarmID = req.query.swarmID

        if (!hiveID || !swarmID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const hive = await getHiveFromDBByID(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        // if user does not have permission to use the hive.
        if (hive.hostID !== user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }

        // attendee can only check their own swarm. host can check any.
        const attendee = await AttendeeModel.findOne({"hiveID": hiveID, "userID": user.userID});
        if (attendee && attendee.swarmID !== swarmID) {
            return res.status(401).json({msg: "You are not permitted to access that swarmID."});
        }

        const swarm = await SwarmModel.findById(swarmID);
        if (!swarm) { // failed to find swarm
            return res.status(404).json({ msg:"Error: Swarm not found." });
        }

        const data = {"messages": []};

        for (let i = 0; i < swarm.messages.length; i++) {
            let curr = swarm.messages[i];
            data.messages.push({
                "sender": curr.sender,
                "message": curr.message,
                "timestamp": curr.timestamp
            });
        }

        return res.status(200).json(data);

    } catch (e) {
        console.error("Error on getSwarmChatHistory controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}
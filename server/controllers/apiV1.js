import UserModel from '../models/userModel.js';
import HiveModel from '../models/hiveModel.js';
import AttendeeModel from '../models/attendeeModel.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// reference: https://dev.to/jeffreythecoder/setup-jwt-authentication-in-mern-from-scratch-ib4
export const register = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    // verify request (can add regex)
    if (!email || !password) {
        // error
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

    let email = "";
    let password = "";
    
    try {

        // create guest user

        var user = new UserModel({
            email: email,
            password: password,
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
        let hive = await hive.findOne({"code": code});
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // check if display name already exists
        let len = hive.attendeeIDs.length;
        for (let i = 0; i < len; i++) {
            let attendee = await AttendeeModel.findById(hive.attendeeIDs[i]);
            if (attendee.name == displayName) {
                return res.status(409).json({msg: "Attendee name already exists in the hive."});
            }
        }

        // create attendee
        let attendee = new AttendeeModel({
            hiveID: hive.hiveID,
            name: displayName,
            biography: biography,
            profilePicture: profilePicture,
            groupID: "",
            swarmID: "",
            recommendedPending: [],
            recoommendedResponses: []
        })

        attendee.userID = attendee._id.toString();
        await attendee.save();

        // add attendee to hive
        hive.attendeeIDs.push(attendee.userID);
        await hive.save();

        // update user's hives
        user.hiveIDs.push(hive.hiveID);
        await user.save();

        return res.status(200).json({hiveID: hive.hiveID});

    } catch (e) {
        console.error("Error on joinHive controller!");
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
            var hive = await HiveModel.findById(user.hiveIDs[i]);
            if (!hive) {
                console.error("Error on getUserHives: invalid hive ID stored in db for userID " + user.userID);
                return res.status(500).json({ msg:"Server Error." });
            }
            var isHost = (user.userID == hive.hostID);
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

        if (!req.body.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await HiveModel.findById(req.body.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }
        //if user does not have permission to use the hive.
        if (hive.hostID != user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }


        var data = {"phase": hive.phase};

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

        if (!req.body.hiveID) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await HiveModel.findById(req.body.hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive does not exist"});
        }
        //if user does not have permission to use the hive.
        if (hive.hostID != user.userID && !hive.attendeeIDs.includes(user.userID)) {
            return res.status(401).json({ msg:"Permission denied." });
        }

        var data = {"phaseCompletionDate": null}; // TODO: implement in later sprint when timers are added.

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

        if (!req.body.code) {
            return res.status(400).json({msg: "Malformed request."});
        }

        const user = await UserModel.findById(req.userID);
        if (!user) { // failed to find user
            return res.status(401).json({ msg:"Invalid user. Action forbidden." });
        }

        const hive = await HiveModel.findOne({"code": req.body.code});
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found."});
        }

        var data = {
            "hiveName": hive.name,
            "phase": hive.phase,
            "phaseCompletionDate": null // TODO: implement in later sprint when timers are added.
            }; 

        return res.status(200).json(data);

    } catch (e) {
        console.error("Error on getHiveTimer controller!");
        console.error(e.message);
        console.error(e.stack)
        res.status(500).json({msg: "Server Error."})
    }
}

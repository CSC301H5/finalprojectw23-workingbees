import UserModel from '../models/userModel.js';
import HiveModel from '../models/hiveModel.js';
import HostModel from '../models/hostModel.js';

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


export const createHive = async (req, res) => {

    let profilePicture = req.body.profilePicture;
    let displayName = req.body.displayName;
    let hiveName = req.body.hiveName;
    let configOptions = req.body.configOptions; // Should be just {} for now
    let code = getUniqueCode();

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

        // create host
        host = new HostModel({
            name: displayName,
            profilePicture: profilePicture
        });

        // create new hive
        hive = new HiveModel({
            name: hiveName,
            code: code,
            attendeeIDs: [],
            groupIDs: [],
            swarmIDs: [],
            phase: 0,
            configOptions: configOptions
        });

        // link host and hive through mutual access of ids
        host.userID = host._id.toString();
        hive.hiveID = hive._id.toString();
        host.hiveID = hive.hiveID;
        hive.hostID = host.userID;
        await host.save();
        await hive.save();

        // update user's hives
        user.hiveIDs.push(hive.hiveID);
        await user.save();

        return res.status(200).json({code: code, hiveID: host.hiveID});

    } catch (e) {
        console.error("Error on createHive controller!");
        console.error(e.message);
        console.error(e.status);
        res.status(500).json({msg: "Server Error."});
    }
}

export const getHiveAttendeeNames = async (req, res) => {

    let hiveID = req.body.hiveID;

    // verify request
    if (!hiveID) {
        return res.status(400).json({msg: "Malformed request."});
    }

    try {
        // try and find hive
        const hive = await HostModel.findbyId(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // get attendee names
        let attendeNames = [];
        let len = hive.attendeeIDs.length;
        for (let i = 0; i < len; i++) {
            let attendee = await AttendeeModel.findById(hive.attendeeIDs[i]);
            attendeNames.push(attendee.name);
        }

        return res.status(200).json({attendeeNames: attendeNames});

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

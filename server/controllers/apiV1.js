import UserModel from '../models/userModel.js';
import HiveModel from '../models/hiveModel.js';
import AttendeeModel from '../models/attendeeModel.js';
import HostModel from '../models/hostModel.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function getUniqueCode() {
    let min = 100000;
    let max = 1000000;
    let unique = false;
    while (!unique) {
        let code = Math.floor(Math.random() * (max - min)) + min
        let hive = await HiveModel.findOne({"code": code});
        if (!hive) {
            return code;
        }
    }
}

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
        let hive = await HiveModel.findOne({"code": code});
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // check that the user is not the host themself
        if (user.userID == hive.hostID) {
            return res.status(409).json({msg: "Error: User is already the host of this hive."});
        }

        // check if attendee name already exists or the user is already in the hive
        for (let i = 0; i < hive.attendeeIDs.length; i++) {
            let attendee = await AttendeeModel.findOne({"userID": hive.attendeeIDs[i]});
            if (attendee.name == displayName) {
                return res.status(409).json({msg: "Error: Attendee name already exists in this hive."});
            }
            if (attendee.userID == user.userID) {
                return res.status(409).json({msg: "Error: User is already an attendee in this hive."});
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
            recommendedResponses: []
        })

        attendee.userID = user.userID;
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

        // check config options body is as desired
        let groupSizeRange = configOptions.groupSizeRange;
        let questions = configOptions.questions;
        if (!groupSizeRange || ! questions) {
            return res.status(400).json({msg: "Malformed request."});
        } else if (!Array.isArray(groupSizeRange) || !Array.isArray(questions) || groupSizeRange.length != 2) {
            return res.status(400).json({msg: "Malformed request."});
        } else if (questions.length == 0) {
            return res.status(400).json({msg: "Error: Hive must have at least one question"});
        }

        // check if min and max are valid
        let min = groupSizeRange[0];
        let max = groupSizeRange[1];
        if (!Number.isInteger(min) || !Number.isInteger(max)) {
            return res.status(400).json({msg: "Error: groupSizeRange must contain numbers"});
        } else if (min < 1 || min > max) {
            return res.status(400).json({msg: "Error: Invalid minimum and maximum values for groupSizeRange"});
        }

        // check that each question is formatted correctly
        for (let i = 0; i < questions.length; i++) {
            let type = questions[i].type;
            let title = questions[i].title;
            let explanation = questions[i].explanation;
            let matchMode = questions[i].matchMode;
            let typeOptions = questions[i].typeOptions;

            // check the question fields exist
            if (!type || !title || !explanation || !matchMode || !typeOptions) {
                return res.status(400).json({msg: "Malformed request. (question " + (i+1) + ")"});
            }

            // check if type and matchMode are valid
            if (type != "DROPDOWN" && type != "MULTISELECT" && type != "NUMBERLINE" && type != "TIMETABLE") {
                return res.status(400).json({msg: "Error: Invalid type for question " + (i+1)});
            } else if (matchMode != "SIMILAR" && matchMode != "DIVERSE" && matchMode != "NONE") {
                return res.status(400).json({msg: "Error: Invalid matchMode for question " + (i+1)});
            }

            // check if typeOptions is valid
            if (type == "DROPDOWN") {
                let options = typeOptions.options;
                let required = typeOptions.required;

                // check if fields exist and are of the correct type
                if (!options || (!required && required !== false)) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                } else if (!Array.isArray(options) || (required !== false && required !== true)) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                }

                // check if the question is possible to answer
                if (required && options.length == 0) {
                    return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one option if it's required"});
                }

            } else if (type == "MULTISELECT") {
                let options = typeOptions.options;
                let maxAllowed = typeOptions.maxAllowed;
                let required = typeOptions.required;

                // check if fields exist and are of the correct type
                if (!options || (!maxAllowed && maxAllowed != 0) || (!required && required !== false)) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                } else if (!Array.isArray(options) || !Number.isInteger(maxAllowed) || (required !== false && required !== true)) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                }

                // check if the question is possible to answer
                if (required && options.length == 0) {
                    return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one option if it's required"});
                } else if (required && maxAllowed <= 0) {
                    return res.status(400).json({msg: "Error: question " + (i+1) + " needs at least one allowed response if it's required"});
                } else if (!required && maxAllowed < 0) {
                    return res.status(400).json({msg: "Error: The number of allowed responses for question " + (i+1) + " must be nonnegative"});
                }

                // limit maxAllowed to the number of available options
                configOptions.questions[i].typeOptions.maxAllowed = Math.min(maxAllowed, options.length);

            } else if (type == "NUMBERLINE") {
                let min = typeOptions.min;
                let max = typeOptions.max;
                let step = typeOptions.step;

                // check if fields exist and are of the correct type
                if ((!min && min != 0) || (!max && max != 0) || !step) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                } else if (!Number.isFinite(min) || !Number.isFinite(max) || !Number.isFinite(step)) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                }
                
                // check if the question is possible to answer
                if (min > max || step > max - min || (max - min) % step != 0) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                }
            } else if (type == "TIMETABLE") {
                let maxAllowed = typeOptions.maxAllowed;

                // check if fields exist and are of the correct type
                if (!maxAllowed && maxAllowed != 0) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                } else if (!Number.isInteger(maxAllowed)) {
                    return res.status(400).json({msg: "Error: Malformed typeOptions for question " + (i+1)});
                }

                // check if the question is possible to answer
                if (maxAllowed < 0) {
                    return res.status(400).json({msg: "Error: The number of allowed responses for question " + (i+1) + " must be nonnegative"});
                }

                // limit maxAllowed to the number of hours in a week
                configOptions.questions[i].typeOptions.maxAllowed = Math.min(maxAllowed, 168);
            }
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
            phase: -1,
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

export const getCode = async (res) => {
    try {
        let hive = await HiveModel.findOne({"phase": -1});
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }
        hive.phase = 0;
        return res.status(200).json({code: hive.code});
    } catch (e) {
        console.error("Error on getCode controller!");
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
        const hive = await HiveModel.findById(hiveID);
        if (!hive) {
            return res.status(404).json({msg: "Error: Hive not found"});
        }

        // try and find user
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(401).json({msg: "Invalid user. Action forbidden."});
        }

        // get attendee names
        let attendeeNames = [];
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

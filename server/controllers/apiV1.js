import UserModel from '../models/userModel.js';
import HiveModel from '../models/hiveModel.js';

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
                res.status(201).json({token});
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


        user = new UserModel({
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


export const getUserHives = async (req, res) => {

}




// export const getTest = async (req, res) => {

//     try {
//         const testModels = await TestModel.find();

//         res.status(200).json(testModels);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }

// }

// export const createTest = async (req, res) => {
//     const body = req.body;

//     const newTest = new TestModel(body);

//     try {
//         await newTest.save();

//         res.status(201).json(newTest);
//     } catch (err) {
//         res.status(409).json({ message: err.message })
//     }
// }
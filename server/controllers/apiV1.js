import UserModel from '../models/userModel.js';
import HiveModel from '../models/hiveModel.js';

export const register = async (req, res) => {

}

export const login = async (req, res) => {

}

export const guestLogin = async (req, res) => {

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
import express from 'express';
import { register, login, guestRegister, getUserHives, createHive, getCode } from '../controllers/apiV1.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/guestRegister', guestRegister);
router.get('/getUserHives', auth, getUserHives); // protected.
router.post('/createHive', createHive);
router.get('/getCode', getCode);

export default router;
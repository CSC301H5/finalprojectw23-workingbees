import express from 'express';
import { register, login, guestRegister, getUserHives, createHive } from '../controllers/apiV1.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/guestRegister', guestRegister);
router.get('/getUserHives', auth, getUserHives); // protected.
router.post('/createHive', auth, createHive);


export default router;
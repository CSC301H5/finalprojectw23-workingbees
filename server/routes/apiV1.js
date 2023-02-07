import express from 'express';
import { register, login, guestLogin, getUserHives } from '../controllers/apiV1.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/guestRegister', guestLogin);
router.get('/getUserHives', auth, getUserHives); // protected.

export default router;
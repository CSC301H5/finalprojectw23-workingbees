import express from 'express';
import { register, login, guestLogin, getUserHives } from '../controllers/apiV1.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/guestlogin', guestLogin);
router.get('/getUserHives', getUserHives);

export default router;
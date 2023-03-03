import express from 'express';
import { register, login, guestRegister, getUserHives, getHiveInfo, getHiveTimer, getHivePhase, joinHive, createHive, getCode, getHiveAttendeeNames } from '../controllers/apiV1.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/guestRegister', guestRegister);
router.get('/getUserHives', auth, getUserHives); // protected.
router.get('/getHiveTimer', auth, getHiveTimer);
router.get('/getHivePhase', auth, getHivePhase);
router.get('/getHiveInfo', auth, getHiveInfo); // still requires guest Auth.
router.post('/joinHive', auth, joinHive);
router.post('/createHive', auth, createHive);
router.get('/getCode', getCode);
router.get('/getHiveAttendeeNames', auth, getHiveAttendeeNames);

export default router;
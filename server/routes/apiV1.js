import express from 'express';
import { register, login, guestRegister, getUserHives, getHiveInfo, getHiveTimer, getHivePhase, joinHive, createHive, getHiveAttendeeNames, getMatchingGroup, roomConfigOptionsCompleted, getIncomingInvites, getOutgoingInvites, sendInvite, acceptInvite, rejectInvite } from '../controllers/apiV1.js'
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
router.get('/getHiveAttendeeNames', auth, getHiveAttendeeNames);
router.get('/getMatchingGroup', auth, getMatchingGroup);
router.get('/roomConfigOptionsCompleted', auth, roomConfigOptionsCompleted);
router.get('/getIncomingInvites', auth, getIncomingInvites);
router.get('/getOutgoingInvites', auth, getOutgoingInvites);
router.post('/sendInvite', auth, sendInvite);
router.post('/acceptInvite', auth, acceptInvite);
router.post('/rejectInvite', auth, rejectInvite);

export default router;
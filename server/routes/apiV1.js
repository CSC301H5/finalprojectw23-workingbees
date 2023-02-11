import express from 'express';
import { register, login, guestRegister, getUserHives, getHiveInfo, getHiveTimer, getHivePhase, joinHive } from '../controllers/apiV1.js'
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

export default router;
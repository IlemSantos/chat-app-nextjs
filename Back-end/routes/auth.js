import { Router } from 'express';
const router = Router();

import { auth_signUp, auth_signInWithPassword, get_user, auth_update } from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js'

router.post('/signup', auth_signUp);

router.post('/signinwithpassword', auth_signInWithPassword);

// router.post('/recover', auth_resetPasswordForEmail);

// router.post('/logout', auth_signOut);

router.use(authMiddleware);

router.get('/user', get_user);

router.post('/user', auth_update);

export default router;

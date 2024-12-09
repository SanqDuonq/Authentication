import express from 'express';
import controller from '../controllers/auth.controllers'
const router = express.Router();

router.post('/login',controller.login);
router.post('/sign-up',controller.signup);

router.post('/verify-email',controller.verifyEmail);

router.post('/forgot-password',controller.forgotPassword);
export default router;
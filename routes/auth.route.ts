import express from 'express';
import controller from '../controllers/auth.controllers';

const router = express.Router();

router.post('/sign-up',controller.signup);

router.post('/verify-email',controller.verifyEmail);

router.post('/reset-password',controller.resetPassword);
export default router;
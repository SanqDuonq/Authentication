import express from 'express';
import controller from '../controllers/auth.controllers';

const router = express.Router();

router.post('/sign-up',controller.signup);


export default router;
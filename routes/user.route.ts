import express from 'express'
import controller from '../controllers/user.controllers'
import middleware from '../middlewares/auth.middleware'
const router = express.Router();

router.get('/get-profile-user/:id',middleware.verifyAccessToken, controller.getProfileUser);

router.post('/refresh-token',controller.refreshToken);



export default router;
import express from 'express'
import controller from '../controllers/user.controllers'
import middleware from '../middlewares/auth.middleware'
const router = express.Router();

router.get('/get-profile-user/:id',middleware.verifyToken, controller.getProfileUser);


export default router;
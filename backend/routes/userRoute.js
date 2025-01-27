import express from 'express'; 
import { loginUser, registerUser, loginAdmin } from '../controllers/userController.js';  

const userRouter = express.Router();

// Register a new user
userRouter.post('/register', registerUser);   //encpoint as register

// User login
userRouter.post('/login', loginUser); //endpoint as login 

// Admin login
userRouter.post('/admin', loginAdmin); // end point as admin/login

export default userRouter;

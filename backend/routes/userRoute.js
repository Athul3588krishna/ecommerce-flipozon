import express from 'express'; 
import { loginUser, registerUser, loginAdmin } from '../controllers/userController.js';  

const userRouter = express.Router();

// Register a new user
userRouter.post('/register', registerUser);

// User login
userRouter.post('/login', loginUser);

// Admin login
userRouter.post('/admin/login', loginAdmin);

export default userRouter;

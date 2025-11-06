import express from 'express';
import { googleLogin, login, logOut, registeration } from '../controller/authController.js';


const authRoutes = express.Router();

authRoutes.post('/registration', registeration);
authRoutes.post('/login', login)
authRoutes.post('/logout', logOut)
authRoutes.post('/googleLogin', googleLogin)

export default authRoutes;
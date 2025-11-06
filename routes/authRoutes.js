import express from 'express';
import { login, logOut, registeration } from '../controller/authController.js';


const authRoutes = express.Router();

authRoutes.post('/registration', registeration)
authRoutes.post('/login', login)
authRoutes.post('/logout', logOut)

export default authRoutes;
import express from 'express';
import { login, logOut, registeration } from '../controller/authController.js';


const authRoutes = express.Router();

authRoutes.post('/registration', (req, res, next) => {
  console.log('✅ registration route hit');
  next();
}, registeration);
authRoutes.post('/login', login)
authRoutes.post('/logout', logOut)

export default authRoutes;
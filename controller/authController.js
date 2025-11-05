import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { genToken } from '../config/token.js';

export const registeration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(2400).json({ message: 'User already exists' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters' });
    }
    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    let token = await genToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log('registeration error');
    return res.status(500).json({ message: `Registeration error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    let token = await genToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ message: 'Login successful' });
  } catch (error) {
    console.log('login error', error);
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('logout error', error);
    return res.status(500).json({ message: `Logout error ${error}` });
  }
};

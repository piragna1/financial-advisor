// src/controllers/authController.mjs

import { findUserByEmail, listUsers } from '../repositories/userRepo.js';
import { registerUser } from '../services/auth/authService.js'
import { loginUser } from '../services/auth/authService.js'
import { validateRegistrationInput } from '../validators/validateRegistrationInput.js';

export async function registerUserController(req, res) {
  try {
    const { name, lastName, email, password } = req.body;
    
    const newUser = await registerUser({ name, email, password })
    
    const users = ( listUsers()).map(u => u.name);
    
    res.status(200).json({
      message:'User registered',
      // token,
      user: {
        id: newUser.id,
        email: newUser.email
      },
      users
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export async function loginUserController(req, res) {
  try {
    const {email,password} = req.body;
    const {user,token,success} = await loginUser({email,password});
    res.status(200).json({ user,token,success });
  } catch (error) {

    res.status(401).json({error: error.message})
    next(error);
  }
}
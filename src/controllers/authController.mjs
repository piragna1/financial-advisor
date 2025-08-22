// src/controllers/authController.mjs

import { findUserByEmail } from '../repositories/userRepo.js';
import { registerUser } from '../services/auth/authService.js'
import { loginUser } from '../services/auth/authService.js'
import { validateRegistrationInput } from '../validators/validateRegistrationInput.js';

export async function registerUserController(req, res) {
  try {
    const { name, lastName, email, password } = req.body;
    const validation = validateRegistrationInput({name,lastName,email,password});
    if (!validation.success){
      throw new Error('Invalid input entered')
    }
    const exist = findUserByEmail(email);
    if (exist) {
      throw new Error('User already exists');
    }
    const newUser = await registerUser({ name, email, password })
    const users = 
    
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export async function loginUserController(req, res) {
  try {
    const {email,password} = req.body;
    const {user, token} = await loginUser({email,password});
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({error: error.message})
  }
}
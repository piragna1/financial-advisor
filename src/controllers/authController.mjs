// src/controllers/authController.mjs

import { registerUser } from '../services/auth/authService.js'
import { loginUser } from '../services/auth/authService.js'

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body
    const newUser = await registerUser({ name, email, password })

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
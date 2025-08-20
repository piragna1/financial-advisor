// src/controllers/authController.mjs

import { registerUser } from '../services/authService.js'
import { loginUser } from '../services/authService.js'

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body
    const newUser = await registerUser({ name, email, password })

    res.status(201).json({ id: newUser.id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export async function loginUserController(req, res) {
  try {
    const {email,password} = req.body;
    const loggedUser = loginUser({email,password});
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({error: error.message})
  }
}
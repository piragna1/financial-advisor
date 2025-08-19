// src/controllers/authController.mjs

import { registerUser } from '../services/authService.js'

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body
    const newUser = await registerUser({ name, email, password })

    res.status(201).json({ id: newUser.id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

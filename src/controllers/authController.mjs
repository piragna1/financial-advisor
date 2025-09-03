// src/controllers/authController.mjs
import { findUserByEmail, listUsers } from '../repositories/userRepo.js';
import { registerUser } from '../services/auth/registerUser.mjs'
import { loginUser } from '../services/auth/loginUser.js'

export async function registerUserController(req, res) {
  try {
    const { name, lastName, email, password } = req.body;
    console.log(`${name} ${lastName}, ${email}, ${password}`)
    
    const newUser = await registerUser({ name, lastName,email, password })
    
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

export async function loginUserController(req, res, next) {
  try {
    const {email,password} = req.body;

    const {user,token,success} = await loginUser({email,password});
    console.log('{user,token,success}:',{user,token,success})
    //
    res.status(200).json({ user,token,success });
  } catch (error) {
    next(error);
  }
}
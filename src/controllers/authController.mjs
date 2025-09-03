// src/controllers/authController.mjs
import { findUserByEmail, listUsers } from '../repositories/userRepo.js';
import { registerUser } from '../services/auth/registerUser.mjs'
import { loginUser } from '../services/auth/loginUser.js'

export async function registerUserController(req, res) {
  try {
    const { name, lastName, email, password } = req.body;
    console.log(`${name} ${lastName}, ${email}, ${password}`)
    
    let newUser = {};
    await registerUser({ name, lastName,email, password }).then((returnVal) => {
      newUser = returnVal['newUser'];
    });
    
    const users = listUsers();
    
    // res.status(200).json({
    //   message:'User registered',
    //   // token,
    //   user: {
    //     id: newUser.id,
    //     email: newUser.email
    //   },
    //   users
    // });

    return newUser;
  } catch (error) {
    throw new Error(error.message)
    // res.status(400).json({ error: error.message })
  }
}

export async function loginUserController(req, res, next) {
  try {
    const {email,password} = req.body;
    const {user,token,success} = await loginUser({email,password});
    return {user, token, success};
    // res.status(200).json({ user,token,success });
  } catch (error) {
    next(error);
  }
}
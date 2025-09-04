// src/controllers/authController.mjs
import { findUserByEmail, listUsers } from '../repositories/userRepo.js';
import { registerUser } from '../services/auth/registerUser.mjs'
import { loginUser } from '../services/auth/loginUser.js'
import { validateRegistrationInput } from '../actors/validators/auth/validateRegistrationInput.js';
import { hashPassword } from '../utils/auth/hashPassword.js';
import {buildUserEntity} from '../entities/userEntity.js'
import { generateUserId } from '../services/user/generateUserId.js';
import { validateLoginInput } from '../actors/validators/auth/validateLoginInput.js';
import { AuthErrors } from '../errors/authErrors.js';
import { AppError } from '../errors/AppError.js';
import { userRetrieve } from '../actors/retrievers/userRetriever.js';
import { issueToken } from '../utils/auth/tokenIssuer.js';
import { mapError } from '../errors/mapError.js';
import { TokenErrors } from '../errors/tokenError.js';
import { TokenGenerationError } from '../errors/tokenGenerationError.js';

export async function registerUserController(req, res) {
  try {
    const { name, lastName, email, password } = req.body;
    
    let newUser = {};

    //call validator
    if (!validateRegistrationInput({name,lastName,email,password}))throw new Error('Invalid registration input')
    //call a searcher for seeking user existence
    let exists = await findUserByEmail(email);


    if (exists) throw new AppError();



    //call a password generator
    const hashedPassword = hashPassword(password);
    const id = generateUserId();
    //call user entity builder
    newUser = buildUserEntity({id,name,lastName,email,hashedPassword});
    //call user saver
    const success = await registerUser(newUser);


    if (!success) throw new Error('Error while creating an user')
    


    res.status(200).json({
      message:'User registered',
      user: {
        id: newUser.id,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export async function loginUserController(req, res, next) {
  try {
    //input
    const {email,password} = req.body;

    //validate input
    let valid = validateLoginInput({email, password});
    if (!valid.ok) throw new AppError (AuthErrors.INVALID_INPUT);

    //userRetrieve
    let user = await userRetrieve(email);
    if (!user) throw new AppError(AuthErrors.USER_NOT_FOUND);

    //password hashing comoparing
    const validPass = comparePasswordHashes(user.passwordHash, password,passwordSecret.PASSWORD_SECRET);
    if (!validPass) throw new AppError(AuthErrors.INVALID_CREDENTIALS);

    //issue token
    const token = issueToken(user);
    if (!token) throw new TokenGenerationError(TokenErrors.TOKEN_GEN_ERROR);

    //return
    res.status(200).json({ user,token,success });
    
  } catch (error) {

    const {code, message, status} = mapError(error);
    res.status(status).json({error:message});

  }
}
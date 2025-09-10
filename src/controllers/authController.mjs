// src/controllers/authController.mjs
import { findUserByEmail, listUsers } from '../repositories/userRepo.js';
import { registerUser } from '../services/auth/registerUser.mjs'
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
import { REGISTRATION_ERRORS } from '../errors/registrationErrors.js';
import {comparePassword} from '../utils/auth/comparePasswords.js'
import {passwordSecret} from '../config/passwordSecretConfig.js'

export async function registerUserController(req, res) {
  try {
    let newUser = {};

    const { name, lastName, email, password } = req.body;

    if (!validateRegistrationInput({name,lastName,email,password}))throw new AppError(REGISTRATION_ERRORS.INVALID_INPUT);

    let exists = await findUserByEmail(email);
    if (exists) throw new AppError(AuthErrors.USER_EXISTS);

    const hashedPassword = hashPassword(password);

    const id = generateUserId();

    newUser = buildUserEntity({id,name,lastName,email,hashedPassword});

    const success = await registerUser(newUser);

    if (!success) throw new AppError(REGISTRATION_ERRORS.CREATION_FAILED);

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

    //password hashing comparing
    const validPass = comparePassword(user.hashedPassword, password,passwordSecret.PASSWORD_SECRET);
    if (!validPass) throw new AppError(AuthErrors.INVALID_CREDENTIALS);

    //issue token
    const token = issueToken(user);
    if (!token) throw new TokenGenerationError(TokenErrors.TOKEN_GEN_ERROR);

    //status return
    res.status(200).json({ user,token,success });
    
  } catch (error) {

    const {code, message, status} = mapError(error);
    res.status(status).json({code,message,status});

  }
}
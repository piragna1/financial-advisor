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
import { comparePasswordHashes } from '../utils/auth/comparePasswords.js';

export async function registerUserController(req, res) {
  try {
    let newUser = {};

    const { name, lastName, email, password } = req.body;

    if (!validateRegistrationInput({name,lastName,email,password}))throw new AppError(REGISTRATION_ERRORS.INVALID_INPUT)//pure

    let exists = await findUserByEmail(email);//semi-pure (access (mock) db)

    if (exists) throw new AppError(AuthErrors.USER_EXISTS);

    const hashedPassword = hashPassword(password);//semi-pure (import crypto)

    const id = generateUserId();//semi-pure (import uuid)

    newUser = buildUserEntity({id,name,lastName,email,hashedPassword});//pure

    const success = await registerUser(newUser);//semi-pure (interacts with uesrRepo.js)

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
    let valid = validateLoginInput({email, password});//pure
    if (!valid.ok) throw new AppError (AuthErrors.INVALID_INPUT);

    //userRetrieve
    let user = await userRetrieve(email);//semi-pure (interactis with userRepo.js)
    if (!user) throw new AppError(AuthErrors.USER_NOT_FOUND);

    //password hashing comparing
    const validPass = comparePasswordHashes(user.passwordHash, password,passwordSecret.PASSWORD_SECRET);//semi-pure (calls another function hashPassword)
    if (!validPass) throw new AppError(AuthErrors.INVALID_CREDENTIALS);

    //issue token
    const token = issueToken(user);//semi-pure 
    if (!token) throw new TokenGenerationError(TokenErrors.TOKEN_GEN_ERROR);

    //status return
    res.status(200).json({ user,token,success });
    
  } catch (error) {

    const {code, message, status} = mapError(error);//pure
    res.status(status).json({code,message,status});

  }
}
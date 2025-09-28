// src/controllers/authController.mjs
import { registerUser } from "../services/auth/registerUser.mjs";
import { validateRegistrationInput } from "../actors/validators/auth/validateRegistrationInput.js";
import { hashPassword } from "../utils/auth/hashPassword.js";
import { buildUserEntity } from "../entities/userEntity.js";
import { generateUserId } from "../services/user/generateUserId.js";
import { validateLoginInput } from "../actors/validators/auth/validateLoginInput.js";
import { AuthErrors } from "../errors/authErrors.js";
import { AppError } from "../errors/AppError.js";
import { issueToken } from "../utils/auth/tokenIssuer.js";
import { mapError } from "../errors/mapError.js";
import { TokenErrors } from "../errors/tokenError.js";
import { TokenGenerationError } from "../errors/tokenGenerationError.js";
import { REGISTRATION_ERRORS } from "../errors/registrationErrors.js";
import { comparePassword } from "../utils/auth/comparePasswords.js";
import { passwordSecret } from "../config/passwordSecretConfig.js";
import { retrieveUserByEmail, retrieveUserById } from '../actors/retrievers/userRetriever.js'
import {normalizeEmail} from '../actors/users/normalizeEmail.js'

export async function registerUserController(req, res) {
  try {
    let newUser = {};


    const { email, password } = req.body;


    if (!validateRegistrationInput({ email, password }))
      throw new AppError(REGISTRATION_ERRORS.INVALID_INPUT);


    if (await retrieveUserByEmail(email)) throw new AppError(AuthErrors.REGISTER.USER_EXISTS);


    const hashedPassword = hashPassword(password, passwordSecret);

    const normalizedEmail = normalizeEmail(email);

    const id = generateUserId();

    newUser = buildUserEntity({ id, email:normalizedEmail, hashedPassword });

    const success = await registerUser(newUser);


    if (!success) throw new AppError(REGISTRATION_ERRORS.CREATION_FAILED);

    res.status(200).json({
      message: "User registered",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ 
      // err:error,
      code:error.code,
      status:error.status,
      message: error.message,
      details:error.details
    });
  }
}

export async function loginUserController(req, res, next) {
  try {
    //input
    const { email, password } = req.body;

    //validate input
    let valid = validateLoginInput({ email, password }); //checked
    if (!valid) throw new AppError(AuthErrors.INVALID_INPUT);

    //userRetrieve
    let user = await retrieveUserByEmail(email);//checked
    if (!user) throw new AppError(AuthErrors.USER_NOT_FOUND);

    console.log('hi i AM USING THIS SECRET', passwordSecret)

    //password hashing comparing
    const validPass = comparePassword(//checked
      user.passwordHash,
      password,
      passwordSecret.PASSWORD_SECRET
    );

    console.log('validpass?', validPass)

    if (!validPass) throw new AppError(AuthErrors.LOGIN.INVALID_CREDENTIALS);
    //issue token
    const token = issueToken(user);//checked
    if (!token) throw new TokenGenerationError(TokenErrors.TOKEN_GEN_ERROR);

    //status return
    res.status(200).json({ user, token });
  } catch (error) {
    const { code, message, status, details } = mapError(error);
    res.status(status).json({ code, message, status });
  }
}
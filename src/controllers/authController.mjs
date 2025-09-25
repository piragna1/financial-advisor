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

    // console.log('ho I am', req.body);//debug

    const { name, lastName, email, password } = req.body;


    if (!validateRegistrationInput({ name, lastName, email, password }))
      throw new AppError(REGISTRATION_ERRORS.INVALID_INPUT);


  // console.log('do ',req.body['name'],'exists?',await findUserByEmail(email));//debug

    if (await retrieveUserByEmail(email)) throw new AppError(AuthErrors.USER_EXISTS);

    const hashedPassword = hashPassword(password);

    const normalizedEmail = normalizeEmail(email);

    const id = generateUserId();

    newUser = buildUserEntity({ id, name, lastName, normalizeEmail, hashedPassword });

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
    // console.log('i am logging the error here for debug purposes', error)
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

    //password hashing comparing
    const validPass = comparePassword(//checked
      user.passwordHash,
      password,
      passwordSecret.PASSWORD_SECRET
    );
    if (!validPass) throw new AppError(AuthErrors.INVALID_CREDENTIALS);

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

// async function test() {
//   const testInputs = [
//     {
//       name: "Gonzalo",
//       lastName: "Varela",
//       email: "gonzalo@example.com",
//       password: "gvalagnA$4",
//     },
//     {
//       name: "Ana",
//       lastName: "Lopez",
//       email: "ana@example.com",
//       password: "Ana123!",
//     },
//     {
//       name: "",
//       lastName: "NoName",
//       email: "noname@example.com",
//       password: "pass123",
//     },
//     { name: "Luis", lastName: "Martinez", email: "", password: "pass123" },
//     {
//       name: "Sara",
//       lastName: "Smith",
//       email: "sara@example.com",
//       password: "",
//     },
//     {
//       name: "Gonzalo",
//       lastName: "Varela",
//       email: "gvalagna@gmail.com",
//       password: "gvalagnA$4",
//     }, // duplicate
//     { name: "李", lastName: "王", email: "li@example.cn", password: "密码123" },
//     {
//       name: "Omar",
//       lastName: "",
//       email: "omar@example.com",
//       password: "omarpass",
//     },
//     {
//       name: "Test",
//       lastName: "User",
//       email: "test@example.com",
//       password: null,
//     },
//     {
//       name: null,
//       lastName: "Null",
//       email: "null@example.com",
//       password: "nullpass",
//     },
//   ];

//   for (const body of testInputs) {
//     const res = {
//       code: undefined,
//       status(code) {
//         this.code = code;
//         return this;
//       },
//       json(payload) {
//         this.response = payload;
//       },
//     };

//     const req = { body };

//     await registerUserController(req, res);
//     console.log("input", req);
//     console.log("response", res["response"]);
//   }
// }

// await test();


// (async function testLoginController(){
  /* body type:
  {
    "email": "gvalagna@gmail.com",
    "password": "gvalagnA$4"
  }
  */
//  const testInputs = [
//   //Valid login
//   {email:'gonzalo@example.com', password:'SuperSecure123!'},
//   // {email:'gonzalo@example.com', password:'WronPass!123'},
//   // {email:'nonexistinguser@example.com',password:'notimportantpasswordkeymasteresecrets'},
//   // {email:'',password:'password'},
//   // {email:'emmail@example.com',password:''},
//   // {email:'jemai@gmail.com',password:null},
//   // {email:'gonzalo@example.com', password:'SuperSecure123'},
//   // {email:'gonzalo@examplee.com', password:'SuperSecure123!'},
//   // {email:null,password:'pass'},
//  ];
//  for (const body of testInputs) {
//   const req = {body};
//   const res = {
//     code:undefined,
//     response:undefined,
//     status(code){
//       this.code=code;
//       return this;
//     },
//     json(paylaod){
//       this.response=paylaod;
//     }
//   }
//   await loginUserController(req,res);
//   console.log('input',body);
//   console.log('status', res.code);
//   console.log('response',res.response);
//  }
// })();
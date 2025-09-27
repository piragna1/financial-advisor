import { retrieveUserById, retrieveUserByEmail } from "../actors/retrievers/userRetriever.js";
import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";
import { findUserById, saveUser } from "../repositories/userRepository.js";
import {updateProfileFields } from '../actors/profile/updateProfileFields.js'

export async function getProfile(req, res,next) {
  try{  

    const user = await retrieveUserById(req.userId); //semi-pure
    if (!user) throw new AppError(AuthErrors.USER_NOT_FOUND,'The user was not found')
    res.status(200).json({ user });
  }catch(err){
    next(err);
  }

};

// controllers/profileController.mjs
export async function updateProfileController(req, res, next) { 
  try {
    const id = req.userId;
    const profile = findUserById(id);
    const updated = updateProfileFields(profile,req.body);
    await saveUser(updated);
    res.json({success:true,updated})
  } catch (error) {
    res.status(400).json({error:error.message});
  }

  
}


/* 
const testInputs = [
  { userId: 'unicode-id' },
  { userId: 'nonexistent-id' },
  { userId: '' },
  { userId: 'u1' },
  { userId: null },
  { userId: undefined },
  { userId: 123 },
];

for (const user of testInputs) {
  const req=user;// {uesrId:'value'} format
  const res = {
    code: undefined,
    response: undefined,
    status(code) {
      this.code = code;
      return this;
    },
    json(payload) {
      this.response = payload;
    },
  };

  const next = (err) => {
    res.code = 500;
    res.response = { error: err.message || 'Unknown error' };
  };

  await getProfile(req, res, next);

  console.log('Input:', req);
  console.log('Status:', res.code);
  console.log('Response:', res.response);
  console.log('---');
}
 */
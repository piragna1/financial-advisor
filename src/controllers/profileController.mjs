import { retrieveUserById, retrieveUserByEmail } from "../actors/retrievers/userRetriever.js";
import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";
import { findUserById, saveUser } from "../repositories/userRepository.js";
import {updateProfileFields } from '../actors/profile/updateProfileFields.js'
import { createProfile } from "../repositories/profileRepository.js";
import { v4 } from "uuid";
import { getProfileByEmail } from "../repositories/profileRepository.js";

import { updateProfile } from "../repositories/profileRepository.js";
import { deleteProfile } from "../repositories/profileRepository.js";

export async function getProfile(req, res,next) {
  try{  

    const user = await retrieveUserById(req.userId); //semi-pure
    if (!user) throw new AppError(AuthErrors.USER_NOT_FOUND,'The user was not found')
    res.status(200).json({ user });
  }catch(err){
    next(err);
  }

};

//----
export async function createProfileController(req, res) {
console.log("Incoming body:", req.body);



  try {
    const {
      userId,
      firstName,
      lastName,
      birthDate,
      location,
      language,
      avatarUrl,
      bio,
    } = req.body;

    const profile = {
      id: v4(),
      userId,
      firstName,
      lastName,
      birthDate,
      location,
      language,
      avatarUrl,
      bio,
    };

console.log('userId hex:', Buffer.from(userId).toString('hex'));


    console.log('profile being sent from controller to repository:', profile)
    const result = await createProfile(profile);
    console.log('here in the controller we have this result', result)

    res.status(201).json({ message: "Profile created", profile: result });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code || "UNHANDLED_ERROR",
      message: error.message || "Unexpected error",
    });
  }
}

//----


export async function getProfileByEmailController(req, res, next) {
  try {
    const { email } = req.params;

    if (!email || typeof email !== "string" || email.trim() === "") {
      throw new AppError(AuthErrors.INVALID_EMAIL, "Missing or invalid email");
    }

    const profile = await getProfileByEmail(email);

    res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
}







export async function updateProfileController(req, res, next) {
  try {
    const profile = {
      id: req.userId, // ownership enforced via token
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      location: req.body.location,
      language: req.body.language,
      avatarUrl: req.body.avatarUrl,
      bio: req.body.bio
    };

    console.log('id received with token:', req.userId);

    const updated = await updateProfile(profile);

    res.status(200).json({ message: "Profile updated", updated });
  } catch (error) {
    next(error);
  }
}



export async function deleteProfileController(req, res, next) {
  try {
    const { id } = req.body;

    const deleted = await deleteProfile(id);

    res.status(200).json({ message: "Profile deleted", deleted });
  } catch (error) {
    next(error);
  }
}

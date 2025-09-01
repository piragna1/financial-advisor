import { AppError } from "../errors/AppError.js";
import { ProfileErrors } from "../errors/profileErrors.js";
import { findUserById } from "../repositories/userRepo.js";

export async function getProfile(req, res) {
  const userId = req.userId;
  const user = await findUserById(userId);
  if (user) {
    res.status(200).json({ user });
  } else {
    throw new AppError(ProfileErrors.USER_NOT_FOUND);
  }
};

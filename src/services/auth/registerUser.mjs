import {  saveUser } from "../../repositories/userRepo.js";

export async function registerUser(user) {
  const wasSaved = await saveUser(user);
  return wasSaved
    ? { success: true, user }
    : { success: false, error: 'User persistence failed' };
}

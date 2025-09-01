import { findUserById } from "../repositories/userRepo.js";

export async function getProfile(req, res,next) {
  try{  
    const userId = req.params.id;
    const user = await findUserById(userId);
    res.status(200).json({ user });
  }catch(err){
    next(err);
  }

};

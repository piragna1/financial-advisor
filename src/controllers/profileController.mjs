import { findUserById } from "../repositories/userRepo.js";


export async function getProfile(req, res,next) {
  try{  
    const userId = req.userId;
    const user = await findUserById(userId); //semi-pure
    res.status(200).json({ user });
  }catch(err){
    next(err);
  }

};

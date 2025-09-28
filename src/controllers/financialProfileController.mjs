

import { createFinancialProfile } from "../repositories/financialProfileRepository.js";
import { v4 } from "uuid";

export async function createFinancialProfileController(req, res, next) {
  try {
    const { userId, salary } = req.body;

    const profile = {
      id: v4(),
      userId,
      salary,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await createFinancialProfile(profile);

    res.status(201).json({ message: "Financial profile created", profile: result });
  } catch (error) {
    next(error);
  }
}





export async function updateFinancialProfileController(req,res,next) {
    try {
        const id = req.userId;
        const profile = finFinancialProfileByuserId(id) //requires creation and implementation.
        const updated = updateFinancialProfileFields(profile,req.body);
        await saveFinancialProfile(updated);//create and implement
        res.json({success:true, updated});
    } catch (error) {
        next(error);
    }
}



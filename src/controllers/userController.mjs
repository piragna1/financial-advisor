import { deleteUserByEmail, listAllUsers, updateUser } from "../repositories/userRepository.js";
import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";
import { hashPassword } from "../utils/auth/hashPassword.js";
import { passwordSecret } from "../config/passwordSecretConfig.js";


export async function updateUserController(req,res,next) {

  
  
  try {
    const {id, email, password} = req.body;
    
    if (req.userId !== id) {
      throw new AppError(AuthErrors.LOGIN.UNAUTHORIZED, "You can only update your own account");
    }
    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = hashPassword(password, passwordSecret.PASSWORD_SECRET);

    const updated = await updateUser(id, updates);
    res.status(200).json({id, updates});
  } catch (error) {
    next(error)
  }
}


export async function deleteUserController(req, res) {
  try {


    console.log('deleteUserController()')

    const { email } = req.params;
    console.log('email of account to be deleted:;', email)


    const success = await deleteUserByEmail(email);

    console.log('success', success)

    if (!success) throw new AppError(AuthErrors.USER_NOT_FOUND);
    res.status(200).json({ message: "User deleted", email });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code || "UNHANDLED_ERROR",
      message: error.message || "Unexpected error",
    });
  }
}



export async function listUsersController(req, res) {
  try {
    const users = await listAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code || "UNHANDLED_ERROR",
      message: error.message || "Unexpected error",
    });
  }
}

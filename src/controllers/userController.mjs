import { deleteUserByEmail } from "../repositories/userRepository.js";
import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";

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

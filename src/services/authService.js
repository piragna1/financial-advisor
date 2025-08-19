const { validateRegistrationInput } = import ('../validators/validateRegistrationInput.js')
const {validateLoginInput } = import ('../validators/validateLoginInput.js')
const { findUserByEmail, saveUser } = import ('../repositories/userRepo')
const bcrypt = import ('bcrypt')
const { v4: uuidv4 } = import ('uuid')

export async function registerUser({ name, email, password }) {
  validateRegistrationInput({ name, email, password })

  const existingUser = await findUserByEmail(email)
  if (existingUser) {
    throw new Error('Email already in use')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = {
    id: uuidv4(),
    name,
    email,
    passwordHash,
    createdAt: new Date(),
    isActive: true
  }

  return await saveUser(newUser)
}


export async function loginUser({email ,password}) {
    const errors = validateLoginInput(email,password);
    if (errors.length) {
  throw new ValidationError(errors);
}
}

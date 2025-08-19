const { validateUserInput } = import ('../validators/validateUserInput')
const { findUserByEmail, saveUser } = import ('../repositories/userRepo')
const bcrypt = import ('bcrypt')
const { v4: uuidv4 } = import ('uuid')

export async function registerUser({ name, email, password }) {
  validateUserInput({ name, email, password })

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


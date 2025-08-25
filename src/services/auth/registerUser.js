export async function registerUser({ name,lastName, email, password }) {
  const validation = validateRegistrationInput({
    name,
    lastName,
    email,
    password,
  });
  if (!validation.success) {
    throw new Error("Invalid input entered");
  }
  const exist = findUserByEmail(email);
  if (exist) {
    throw new Error("User already exists");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    name,
    email,
    passwordHash,
    createdAt: new Date(),
    isActive: true,
  };

  return await saveUser(newUser);
}

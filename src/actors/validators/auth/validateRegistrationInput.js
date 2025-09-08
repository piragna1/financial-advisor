export function validateRegistrationInput({ name,lastName, email, password }) {
  if (!name || !lastName||!email || !password  ) {
    throw new Error("All fields: name, last name, email and password are required")
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format")
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long")
  }

    if (/\d/.test(name) || /\d/.test(lastName)) 
      throw new Error('Name cannot contain numbers');

  return true;
}

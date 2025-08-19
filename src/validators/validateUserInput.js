export function validateUserInput({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("All fields (name, email, password) are required")
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format")
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long")
  }

  // You can add uniqueness check later in the controller or service
}


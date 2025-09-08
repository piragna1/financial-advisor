export function validateEmailInput(email) {
  const errors = [];

  if (!email) {
    errors.push("Email is required");
  } else if (typeof email !== "string") {
    errors.push("Email must be a string.");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Email format is invalid");
  }

  return errors;
}

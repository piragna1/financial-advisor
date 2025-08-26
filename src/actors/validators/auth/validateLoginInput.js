//validateLoginInput.js
export function validateLoginInput(input) {
  const { email, password } = input;
  const errors = {};
  if (!email) errors.email = "required";
  if (!password) errors.password = "required";
  if (!email || typeof email !== "string") {
    errors.email = "Email must be a string.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Email format is invalid";
  }
  if (!password || typeof password !== "string") {
    errors.password = "Password is required and must be a string";
  }
  return Object.keys(errors).length === 0
    ? { ok: true, value: { email, password } }
    : { ok: false, value: errors };
}

export function validateEmailInput(email) {
    const errors = {};
  if (!email) {
    errors.email.push("Email isrequired");
  }word.push("Password is required.");
  }
  if (email && typeof email !== "string") {
    errors.email.push("Email must be a string.");
  } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email.push("Email format is invalid");
  }
}

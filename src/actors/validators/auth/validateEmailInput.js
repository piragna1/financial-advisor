export function validateEmailInput(email) {
    const errors = [];
  if (!email) {
    errors.push("Email isrequired");
  }
  if (email && typeof email !== "string") {
    errors.push("Email must be a string.");
  } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Email format is invalid");
  }
}


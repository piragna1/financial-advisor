export function validateLoginInput({ email, password }) {
  const errors = [];

  if (!email || typeof email !== 'string') {
    errors.push('Email is required and must be a string.');
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Email format is invalid.');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required and must be a string.');
  }

  return errors;
}

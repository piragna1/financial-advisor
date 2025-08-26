async function verifyPassword(password, userPasswordHash) {
  const result = await bcrypt.compare(password, userPasswordHash);
  if (!result) throw new InvalidCredentialsError(); //custom
  return true;
}
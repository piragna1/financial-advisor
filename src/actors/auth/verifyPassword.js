export function verifyPassword(hash1, hash2) {
  if (!hash1 || !hash2) return false;
  return hash1===hash2;
}
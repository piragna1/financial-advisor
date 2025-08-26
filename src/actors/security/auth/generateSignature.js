export function generateSignature(string, secret) {
  if (typeof string !== "string") {
    throw Error("Invalid input key");
  }
  if (typeof secret !== "string" || secret.length === 0) {
  throw Error("Invalid secret");
}
  let signature = hash(string,secret);

  return Buffer.from(signature.slice(0,256)).toString('base64url');
}
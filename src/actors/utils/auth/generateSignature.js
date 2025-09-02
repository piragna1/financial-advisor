import { createHmac } from "crypto";
/**
 *
 * @param {*} string The header and the payload of a token formatted as `header.payload`.
 * @param {*} secret The secret word for salting the token generation.
 * @returns
 */
export function generateSignature(string, secret = "secret") {
  if (typeof string !== "string") {
    throw Error("Invalid input key");
  }
  if (typeof secret !== "string" || secret.length === 0) {
    throw Error("Invalid secret");
  }

  console.log('Este es el secreto que estoy usando:', secret)
  const hmac = createHmac("sha256", secret);
  hmac.update(string);
  return hmac.digest("base64url");
}

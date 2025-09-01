import {createHmac} from 'crypto';

export function generateSignature(string, secret='secret') {
  if (typeof string !== "string") {
    throw Error("Invalid input key");
  }
  if (typeof secret !== "string" || secret.length === 0) {
  throw Error("Invalid secret");
}
  const hmac = createHmac('sha256', secret);
  hmac.update(string);
  return hmac.digest('base64url');
}
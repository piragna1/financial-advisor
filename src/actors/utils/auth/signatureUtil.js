export function generateSignature(string, secret) {
  if (typeof string !== "string") {
    throw Error("Invalid input key");
  }
  if (typeof secret !== "string" || secret.length === 0) {
  throw Error("Invalid secret");
}
  let signature = "";
  const prime1 = 3;
  const prime3= 199;

  let sum;
  for (let index = 0; index < string.length; index++) {
    sum=0;
    let charcode = string.charCodeAt(index);
    let charcode1=secret.charCodeAt(index%secret.length);
    sum += ((charcode*charcode1*prime3)*prime1);
    signature+=sum.toString();
  }
  return Buffer.from(signature.slice(0,256)).toString('base64url');
}
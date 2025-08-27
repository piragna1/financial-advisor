export function hash(string, optionalSalt=""){
    if (typeof string !== "string") {
    throw Error("Invalid input key");
  }
  let hashedPassword = "";
  const prime1 = 3;
  const prime3= 199;

  let sum;
  for (let index = 0; index < string.length; index++) {
    sum=0;
    let charcode = string.charCodeAt(index);
    let charcode1=optionalSalt.charCodeAt(index%optionalSalt.length);
    if (charcode1) sum += ((charcode*charcode1*prime3)*prime1);
    else sum += ((charcode*prime3)*prime1);
    hashedPassword+=sum;
  }
  return hashedPassword.toString();
}
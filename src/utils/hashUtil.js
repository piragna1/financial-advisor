function hash(string, salt) {
  if (typeof string !== "string") {
    throw Error("Invalid input key");
  }
  let signature = "";
  const prime1 = 3;
  const prime3= 199;

  let sum;
  for (let index = 0; index < string.length; index++) {
    sum=0;
    let charcode = string.charCodeAt(index);
    let charcode1=salt.charCodeAt(index%salt.length);
    sum += ((charcode*charcode1*prime3)*prime1)%string.length;
    signature+=sum.toString();
  }
  return Buffer.from(signature).toString('base64');
}
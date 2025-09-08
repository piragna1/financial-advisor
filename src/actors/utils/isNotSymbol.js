export function isNotSymbol(char){
    // Check if the character is alphanumeric or a space
  return /^[a-zA-Z0-9 ]$/.test(char);
}

console.log(isNotSymbol());//f
console.log(isNotSymbol(''));//f
console.log(isNotSymbol('1'));//t
console.log(isNotSymbol('A'));//t
console.log(isNotSymbol('a'));//t
console.log(isNotSymbol(' '));//t
console.log(isNotSymbol('$'));//f
export function isNotSymbol(char){
    // Check if the character is alphanumeric or a space
  return /^[a-zA-Z0-9 ]$/.test(char);
}

//Need to fix:
//Empty input: f | expected -> t
console.log(isNotSymbol());
//Empty string: f | expected -> t
console.log(isNotSymbol(''));
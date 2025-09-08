export function isNotSymbol(char){
    // Check if the character is alphanumeric or a space
  if (char == null || char === '') return true;
  return /^[a-zA-Z0-9 ]$/.test(char);
}

//Need to fix:
//Empty input: t | expected -> t
console.log(isNotSymbol());
//Empty string: t | expected -> t
console.log(isNotSymbol(''));
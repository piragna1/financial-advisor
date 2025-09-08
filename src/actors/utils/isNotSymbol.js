export function isNotSymbol(char){
    // Check if the character is alphanumeric or a space
  return /^[a-zA-Z0-9 ]$/.test(char);
}

//Empty input: f | expected -> t
console.log(isNotSymbol());
//Empty string: f | expected -> t
console.log(isNotSymbol(''));
//Number as character: t | expected -> t
console.log(isNotSymbol('1'));
//Uppercase letter: t | expected -> t
console.log(isNotSymbol('A'));
//Lowercase letter: t | expected -> t
console.log(isNotSymbol('a'));
// Empty space: t | expected -> t
console.log(isNotSymbol(' '));//t
//Symbol: f | expected -> f
console.log(isNotSymbol('$'));//f

//Need to fix:
//
//
//
//
//
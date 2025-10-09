export function isNotSymbol(char){
    // Check if the character is alphanumeric or a space
  if (char == null || char === '') return true;
  return /^(?:\p{L}|'|-|\s)$/u.test(char);
}

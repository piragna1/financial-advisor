export function isNotSymbol(char){
    // Check if the character is alphanumeric or a space
  return /^[a-zA-Z0-9 ]$/.test(char);
}
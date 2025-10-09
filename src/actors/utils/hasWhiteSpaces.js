export function hasWhiteSpaces(input){
    if (typeof input !== 'string') throw new Error('Input is not a string')
    return /\s/.test(input); // includes tabs, newlines, NBSP, etc.
}

export function hasControlChars(input){
    if (input == null || typeof input !== 'string') throw new Error('Empty input');
    return /[\x00-\x1F\x7F]/.test(input);
}
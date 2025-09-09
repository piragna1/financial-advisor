export function hasControlChars(input){
    return /[\x00-\x1F\x7F]/.test(input);
}
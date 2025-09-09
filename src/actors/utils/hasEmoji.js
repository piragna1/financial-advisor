export function hasEmoji(input){
    return /[\p{Emoji}]/gu.test(input);
}
export function hasEmoji(password){
    return /[\p{Emoji}]/gu.test(password);
}
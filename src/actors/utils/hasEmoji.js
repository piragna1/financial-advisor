export function hasEmoji(input){
    console.log('input:',input) //debug purposes
    return /[\p{Emoji}]/gu.test(input);
}
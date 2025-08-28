export function invalidateUserToken(token){
    token.signature = 'invalid :P';
    return token;
}
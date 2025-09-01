export function extractToken(req){
    return req.headers.authorization;
}
export function tokenExists(req){
    return req.headers.authorization != null;
}
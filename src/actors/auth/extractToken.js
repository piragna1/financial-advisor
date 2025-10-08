export function extractToken(req){
    const header = req.headers?.authorization;
    return header?.startsWith('Bearer ') ? header.slice(7) : header;
}
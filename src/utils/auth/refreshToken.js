import { issueToken } from "./tokenIssuer";

export function refreshToken(req){
    return issueToken(req.user);
}
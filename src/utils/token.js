export function generateToken(userId, secret = 'secret',expiresInSeconds=3600){
    const now = Math.floor(Date.now()/1000);
    const exp = now+expiresInSeconds;
    const header = {alg:'HS256', typ:'JWT'};
    const payload = {
        sub:userId,
        iat:now,
        exp
    };
    const base64Header = Buffer.from(JSON.stringify(header)).toString('base64');
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signatureB64 = Buffer.from(`${base64Header}.${base64Payload+secret}`).toString('base64');
    return `${base64Header}.${base64Payload}.${signatureB64}`;
};

export function verifyToken(token,secret='secret'){
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    if (!headerB64 || !payloadB64 || !signatureB64){
        throw new Error('Invalid token structure');
    }
    const expectedSignature = Buffer.from(headerB64+'.'+payloadB64+secret).toString('base64url');
    if (signatureB64 !== expectedSignature){
        throw new Error('Invalid token signature.');
    }
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    return payload;
}

export function decodeToken(token){
    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        return decoded;
    } catch (error) {
        return null;
    }
}

export function isTokenExpired(token){
    const payload = decodeToken(token);
    if(!payload || !payload.exp) return true;
    const now = Math.floor(Date.now()/100);
    return now > payload.exp;
}

export function refreshToken(oldToken, secret){
    if (isTokenExpired(oldToken)){
        const payload = JSON.parse(atob(oldToken.split('.')[1]));
        delete payload.exp;
        return generateToken(payload, secret);
    }
    return oldToken;
}
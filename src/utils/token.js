export function generateToken(userId, secret = 'secret',expiresInSeconds='3600'){
    Math.floor(Date.now()/1000)+expiresInSeconds;
    const header = {alg:'HS256', typ:'JWT'};
    const payload = {
        sub:userId,
        iat:Date.now()
    };
    //simulate encoding
    const base64Header = Buffer.from(JSON.stringify(header)).toString('base64');
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = Buffer.from(base64Header+'.'+base64Payload+secret).toString('base64')
    return `${base64Header}.${base64Payload}.${signature}`;
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
        const decoded = JSON.parse(atob(token));
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


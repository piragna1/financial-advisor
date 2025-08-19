export function generateToken({userId}){
    const payload = {
        sub:userId,
        iat:Date.now()
    };
    //simulate encoding
    const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    return `simulated-jwt.${base64}`;
};
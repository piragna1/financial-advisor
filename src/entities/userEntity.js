
export function buildUserEntity({id,name,lastName='',email,hashedPassword}){
    const user = {
        id,
        name,
        lastName,
        email,
        hashedPassword
    }
    return user;
};
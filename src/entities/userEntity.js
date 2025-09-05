
export function buildUserEntity({id,name,lastName='',email,hashedPassword}){
    const user = {
        id:String = id,
        name:String = name,
        lastName:String = lastName,
        email:String = email,
        hashedPassword:String = hashedPassword
    }
    return user;
};

export function buildUserEntity({id,name,lastName,email,hashedPassword},){
    //consider all values as valid
    return {
        id,name,lastName,email,hashedPassword
    };
};
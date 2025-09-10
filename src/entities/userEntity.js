
export function buildUserEntity({id,name,lastName='',email,hashedPassword}){
    const user = {
        id,
        name,
        lastName,
        email,
        hashedPassword,
        createdAt:Date.now()
    }
    return user;
};

console.log(buildUserEntity(
    {
        id:'1',
        name:'gon',
        lastName:'var',
        email:'gonzalo@example.com',
        hashedPassword:'7cfb26784163a421daa0dee7c46de2e8d0c825223ed2ff07ce3069682c3d9a12'
    }
));

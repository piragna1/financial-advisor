export async function checkUserUniqueness (email, users) {
    const exist = users.some((user) => user['email'] === email);
    return {
        succes: exist,
        message: exist ? 'Email is not valid' : 'Email available'
    }
}
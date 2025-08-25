//now receives users as argument in order to not call userRepo and being an impure function.
export async function checkUserUniqueness (email, users) {
    const exist = users.some((user) => u.email === email);
    return {
        succes: exist,
        message: exist ? 'Email is not valid' : 'Email available'
    }
}
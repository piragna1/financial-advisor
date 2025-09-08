export async function checkUserUniqueness (email, users) {
    const exist = users.some((user) => user['email'] === email);
    return {
        succes: exist,
        message: exist ? 'Email is not valid' : 'Email available'
    }
}

//mock.db.config.js
const users = [
  { id: 'u1', email: 'gonzalo@example.com', passwordHash: '985b883e66e9f181eede78d83eca52c67f6e571b82599d1c1da9681920e007df' },
  { id: 'u2', email: 'ana@example.com', passwordHash: '1612919b91393fdab5c16a4a979b54f90b2870afa0772f26a1919d5e41fa7996' },
];
console.log(await checkUserUniqueness('gonzalo@ecample.com',users));//
console.log(await checkUserUniqueness('gonzalo@example.com',users));//

const mockUsers = [
  { id: 'u1', email: 'gonzalo@example.com', passwordHash: 'hashed123' },
  { id: 'u2', email: 'ana@example.com', passwordHash: 'hashed456' },
];

function findUserByEmail(email) {
  return mockUsers.find(user => user.email === email);
}

function insertUser(user) {
  mockUsers.push(user);
  return user;
}

module.exports = {
  mockUsers,
  findUserByEmail,
  insertUser,
};

// userRepo.js

const users = []; // In-memory store for now

export async function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

export async function saveUser(user) {
  users.push(user);
  return user;
}

export async function listUsers(){
  return users.slice();
}
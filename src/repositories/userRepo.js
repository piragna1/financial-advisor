// userRepo.js

const users = []; // In-memory store for now

export function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

export function saveUser(user) {
  users.push(user);
  return user;
}

export function listUsers(){
  return users.slice();
}
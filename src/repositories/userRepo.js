// userRepo.js

import { mockUsers } from '../config/mock.db.config.js';

export async function findUserByEmail(email) {
  console.log('userRepo.js -> findUserByEmail()')
  console.log('mockUsers',mockUsers);
  console.log('mockUsers.find(user => user.email === email)',mockUsers.find(user => user.email === email));
  return mockUsers.find(user => user.email === email);
}

export function saveUser(user) {
  mockUsers.push(user);
  return user;
}

export function listUsers(){
  return mockUsers.slice();
}
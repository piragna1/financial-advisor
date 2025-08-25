// userRepo.js

import { mockUsers } from '../config/mock.db.config.js';

export function findUserByEmail(email) {
  return mockUsers.find(user => user.email === email);
}

export function saveUser(user) {
  mockUsers.push(user);
  return user;
}

export function listUsers(){
  return mockUsers.slice();
}
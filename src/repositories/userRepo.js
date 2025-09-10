// userRepo.js

import { mockUsers } from '../config/mock.db.config.js';

export async function findUserByEmail(email) {
  return mockUsers.find(user => user.email === email);
}

export async function findUserById(id) {
  return mockUsers.find(user => user.id === id);
}

export function saveUser(user) {
  mockUsers.push(user);
  return user;
}

export function listUsers(){
  return mockUsers.slice();
}

export function deleteUser(id){
  for (let i = 0; i < mockUsers.length; i++){
    if (mockUsers[i].id === id){
      mockUsers.splice(i,1)
      return;
    }
  }
}
import { mockUsers } from "../../config/mock.users.db.config.js";
import {  saveUser } from "../../repositories/userRepository.js";

export async function registerUser(user) {

  console.log('user received on registerUser', user)
  const wasSaved = await saveUser(user);
  return wasSaved
    ? { success: true, user }
    : { success: false, error: 'User persistence failed' };
}

// Assuming registerUser and saveUser are already defined and imported

// const testInputs = [
//   { id: 'u1', name: 'Gonzalo', lastName: 'Var', email: 'gon@example.com', hashedPassword: 'abc123' },
//   { id: 'u2', name: 'Ana', lastName: 'López', email: 'ana@example.com', hashedPassword: 'def456' },
//   { id: 'u3', name: '李', lastName: '王', email: 'li@example.cn', hashedPassword: 'ghi789' },
//   { id: 'u4', name: 'Omar', lastName: '', email: 'omar@example.com', hashedPassword: 'jkl012' },
//   { id: 'u5', name: 'Sara', email: 'sara@example.com', hashedPassword: 'mno345' }, // no lastName
//   { id: 'u6', name: '', email: 'empty@example.com', hashedPassword: 'pqr678' }, // empty name
//   { id: 'u7', name: 'NullUser', email: null, hashedPassword: 'stu901' }, // null email
//   { id: 'u8', name: 'BadType', email: {}, hashedPassword: 'vwx234' }, // email as object
//   { id: 'u9', name: 'MissingPass', email: 'miss@example.com' }, // missing hashedPassword
//   { id: 'u10', name: 'Clone', email: 'clone@example.com', hashedPassword: 'abc123', id: 'u1' } // duplicate ID
// ];
// (async () => {
//   for (const input of testInputs) {
//     try {
//       const result = await registerUser(input);
//       console.log('Input:', input);
//       console.log('Result:', result);
//       console.log('---');
//     } catch (error) {
//       console.log('Input:', input);
//       console.log('Error:', error.message || error);
//       console.log('---');
//     }
//   }
// })();

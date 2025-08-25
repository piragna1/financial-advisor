import { registerUser } from "../services/auth/registerUser.mjs";
import { mockUsers } from "../config/mock.db.config.js";

const input = {
  name: "Gonzalo",
  lastName: "Varela Alagna",
  email: "gona@gmail.com",
  password: "securePass123",
};

async function testRegisterFlow(user) {

  console.log("Test de registro de usuario:");

  const result = await registerUser(user);

  if (!result.success) {
    return;
  }
  console.log(`Usuario registrado correctamente
    id:${result.newUser['id']} -> success:${result.success}`);
    const registeredUser = mockUsers.find((u)=> {return result.id === u.id});
    if (registeredUser){
        console.log(`Registered user:${result}`);
    }
    console.log('Estado actual de mockUsers:',mockUsers);
}


testRegisterFlow(input);
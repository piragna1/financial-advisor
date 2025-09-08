//validateLoginInput.js
export function validateLoginInput(input) {
  const { email, password } = input;
  const errors = {
    email:[],
    password:[]
  };
  if (!email) {
    errors.email.push("Email isrequired");
  }
  if (!password){ errors.password.push("Password is required.");

  };
  
  if (typeof email !== "string") {
    errors.email.push("Email must be a string.");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email.push("Email format is invalid");
  }
  if (!password || typeof password !== "string") {
    errors.password.push("Password is required and must be a string");
  }
  return (Object.keys(errors.email).length === 0 && Object.keys(errors.password).length === 0 )
    ? { ok: true, value: { email, password } }
    : { ok: false, value: errors };
}
//------------------------------------- TEST CASES

//-----Works fine

//--invalid email format
console.log(
  validateLoginInput({ email: "gonzalo@.com", password: "lalala123" })
); 

//correct input
console.log(
  validateLoginInput({ email: "gonzalo@example.com", password: "lalala123" })
); 

//email not string
console.log(validateLoginInput({ email: 12345, password: "securePass123" }));
// //-------------------------------------

// //-----Must correct
// //missing email
// console.log(validateLoginInput({ password: "securePass123" })); //{ ok: false, value: { email: 'Email must be a string.' } } should be: email is required

// //missing password
// console.log(validateLoginInput({ email: "user@example.com" })); /* {
//   ok: false,
//   value: { password: 'Password is required and must be a string' }
// }
// should be: password is required  
// */

// //password not string
// console.log(
//   validateLoginInput({ email: "gonzalo@example.com", password: 123 })
// ); /* 
// {
//   ok: false,
//   value: { password: 'Password is required and must be a string' }
// }
// Should be: password must be a string  
// */

// //Missing email and missing password
// console.log(validateLoginInput({})); /* {
//   ok: false,
//   value: {
//     email: 'Email must be a string.',
//     password: 'Password is required and must be a string'
//   }
// }
//   expected:{
//     ok: false,
//     value: {
//       email: 'Email is required.',
//       password: 'Password is required'
//     }
//   }
// */

// //Empty strings
// console.log(validateLoginInput({ email: "", password: "" })); //expected:
// // // → { ok: false, value: { email: 'Email format is invalid', password: 'Password is required and must be a string' } }
// //output:
// /*
// {
//   ok: false,
//   value: {
//     email: 'Email must be a string.',
//     password: 'Password is required and must be a string'  
// */

// //-------------------------------------


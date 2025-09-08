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
  
  if (email && typeof email !== "string") {
    errors.email.push("Email must be a string.");
  } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email.push("Email format is invalid");
  }
  if (password  && typeof password !== "string") {
    errors.password.push("Password is required and must be a string");
  }
  return (Object.keys(errors.email).length === 0 && Object.keys(errors.password).length === 0 )
    ? { ok: true, value: { email, password } }
    : { ok: false, value: errors };
}
//------------------------------------- TEST CASES

// //-----Works fine

// //--invalid email format
// console.log(
//   validateLoginInput({ email: "gonzalo@.com", password: "lalala123" }) //ok
// ); 

// //correct input
// console.log(
//   validateLoginInput({ email: "gonzalo@example.com", password: "lalala123" })
// ); //ok

// //email not string
// console.log(validateLoginInput({ email: 12345, password: "securePass123" }));//ok
// //missing email
// console.log(validateLoginInput({ password: "securePass123" })); //ok
// //missing password
// console.log(validateLoginInput({ email: "user@example.com" })); //ok
// //password not string
// console.log(
//   validateLoginInput({ email: "gonzalo@example.com", password: 123 })
// ); //ok
// //Missing email and missing password
// console.log(validateLoginInput({}));//ok
// //Empty strings
// console.log(validateLoginInput({ email: "", password: "" })); //ok
// // //-------------------------------------

// // //-----Must correct
// // //-------------------------------------


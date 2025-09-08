//validateLoginInput.js
export function validateLoginInput(input) {
  const { email, password } = input;
  const errors = {};
  if (!email) errors.email = "required";
  if (!password) errors.password = "required";
  if (!email || typeof email !== "string") {
    errors.email = "Email must be a string.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Email format is invalid";
  }
  if (!password || typeof password !== "string") {
    errors.password = "Password is required and must be a string";
  }
  return Object.keys(errors).length === 0
    ? { ok: true, value: { email, password } }
    : { ok: false, value: errors };
}
//------------------------------------- TEST CASES

//-----Works fine

//--invalid email format
console.log(validateLoginInput({email:'gonzalo@.com', password:'lalala123'}));//{ ok: false, value: { email: 'Email format is 
// invalid' } }

//correct input
console.log(validateLoginInput({email:'gonzalo@example.com', password:'lalala123'}));/*{
  ok: true,
  value: { email: 'gonzalo@example.com', password: 'lalala123' }
} */

//email not string
console.log(validateLoginInput({ email: 12345, password: 'securePass123' }));//{ ok: false, value: { email: 'Email must be a string.' } }
//-------------------------------------

//-----Must correct
//missing email
console.log(validateLoginInput({ password: 'securePass123' }))//{ ok: false, value: { email: 'Email must be a string.' } } should be: email is required

//missing password
console.log(validateLoginInput({ email: 'user@example.com' }))/* {
  ok: false,
  value: { password: 'Password is required and must be a string' }
}
should be: password is required  
*/

//password not string
console.log(validateLoginInput({email:'gonzalo@example.com', password:123}));/* 
{
  ok: false,
  value: { password: 'Password is required and must be a string' }
}
Should be: password must be a string  
*/

//-------------------------------------

//Missing email and missing password
console.log(validateLoginInput({}));/* {
  ok: false,
  value: {
    email: 'Email must be a string.',
    password: 'Password is required and must be a string'
  }
}
  
*/

//comparePasswords.js
import { passwordSecret } from '../../config/passwordSecretConfig.js';
import { hashPassword } from './hashPassword.js';

export function comparePassword(real,input,secret){//checked

    console.log('comparePassword()')
    //real is a hashed password!

    console.log('real', real)
    console.log('input', input)
    console.log('secret', secret)


    const hashed = hashPassword(input,secret); //semi pure (crypto import)

    console.log('hashed', hashed)
    return real ===  hashed;
}

// // console.log(hashPassword('realpass',passwordSecret.PASSWORD_SECRET));//51b7b6e18f40e2797fb75eeae6f7e1d79a66a7e3dd555eff499f6c44319d3a9b

// const real = '51b7b6e18f40e2797fb75eeae6f7e1d79a66a7e3dd555eff499f6c44319d3a9b';

// const testInputs = [
//       'realpass',           // ✅ correct password
//       'RealPass',           // ❌ case-sensitive mismatch
//       'realPass',          // ❌ trailing space
//       '',                   // ❌ empty string
//       'realpass123',        // ❌ wrong password
//       ' realpass',          // ❌ leading space
//       'realpass\n',         // ❌ newline character
//       'realpass\t',         // ❌ tab character
//     ];
    
//     for (const input of testInputs) {
//       const result = comparePassword(real, input, passwordSecret.PASSWORD_SECRET);
//       console.log(`Input: "${input}" → Match: ${result}`);
//     };
import { AppError } from "./AppError.js";

export function mapError(error){
    if (error){
        if (error instanceof AppError){
            if (error.code && error.message && error.status)
                return {
                    code:error.code,
                    message:error.message,
                    status:error.status,
                    details:error.details || ''
                }
        }

    }
    return {
        code:'UNEXPECTED_ERROR',
        message:"An unexpected error has ocurred",
        status:500
    }
}

// const testInputs = [
//   // ✅ Well-formed AppError instances
//   new AppError({ code: 'AUTH_FAIL', message: 'Auth failed', status: 401 }, 'Invalid token'),
//   new AppError({ code: 'DB_ERR', message: 'DB error', status: 500 }),
//   new AppError({ code: '', message: '', status: '' }, ''),
//   new AppError({}, ''),
//   new AppError({ message: 'Only message' }, 'Minimal'),

//   // ❌ Non-AppError instances
//   new Error('Native error'),
//   { code: 'MALFORMED', message: 'Malformed object', status: 400 },
//   { message: 'Missing code and status' },
//   { code: 'NO_MESSAGE', status: 404 },
//   { code: 'NO_STATUS', message: 'Missing status' },
//   null,
//   undefined,
//   42,
//   'error',
//   true,
//   [],
//   () => ({ code: 'FUNC', message: 'Function', status: 500 }),

//   // ❌ Deeply nested or malformed AppError-like objects
//   (() => {
//     const circular = {};
//     circular.self = circular;
//     return circular;
//   })(),

//   (() => {
//     const symKey = Symbol('sym');
//     return { [symKey]: 'value', message: 'Symbol key' };
//   })(),

//   Object.fromEntries(Array.from({ length: 50 }, (_, i) => [`key${i}`, `value${i}`])),
// ];

// for (const input of testInputs) {
//   try {
//     const result = mapError(input);
//     console.log('📥 Input:', input);
//     console.log('📤 Output:', result);
//   } catch (e) {
//     console.error('❌ mapError threw:', e.message);
//   }
//   console.log('---');
// }

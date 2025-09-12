export class AppError extends Error{
    constructor({code='',message='',status=''},details=''){
        super(message);
        Object.assign(this, {code, status,details})
    }
}

const testInputs = [
  // ✅ Valid inputs
  { input: { code: 'AUTH_FAIL', message: 'Authentication failed', status: 401 }, details: 'Invalid token' },
  { input: { code: 'DB_ERR', message: 'Database error', status: 500 }, details: 'Connection timeout' },
  { input: { code: '', message: '', status: '' }, details: '' },
  { input: {}, details: '' },
  { input: { message: 'Only message' }, details: 'Minimal case' },

  // ❌ Missing input object
  { input: null, details: 'Null input' },
  { input: undefined, details: 'Undefined input' },
  { input: 42, details: 'Number instead of object' },
  { input: 'error', details: 'String instead of object' },
  { input: true, details: 'Boolean instead of object' },
  { input: [], details: 'Array instead of object' },

  // ❌ Malformed fields
  { input: { code: 123, message: {}, status: [] }, details: { info: 'object' } },
  { input: { code: null, message: null, status: null }, details: null },
  { input: { code: undefined, message: undefined, status: undefined }, details: undefined },
  { input: { code: Symbol('sym'), message: Symbol('msg'), status: Symbol('stat') }, details: Symbol('detail') },

  // ❌ Extra fields
  { input: { code: 'EXTRA', message: 'Extra fields', status: 400, foo: 'bar', nested: { a: 1 } }, details: 'Extra data' },

  // ❌ Deeply nested input
  { input: { code: { inner: 'CODE' }, message: { text: 'Nested message' }, status: { code: 200 } }, details: { deep: true } },

  // ❌ Function as input
  { input: () => ({ code: 'FUNC', message: 'Function input', status: 500 }), details: 'Function payload' },

  // ❌ Circular reference
  (() => {
    const circular = {};
    circular.self = circular;
    return { input: circular, details: 'Circular reference' };
  })(),

  // ❌ Symbol keys
  (() => {
    const symKey = Symbol('sym');
    return { input: { [symKey]: 'value', message: 'Symbol key' }, details: 'Symbol in object' };
  })(),

  // ❌ Massive object
  {
    input: Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [`key${i}`, `value${i}`])),
    details: 'Huge object'
  },
];

for (const { input, details } of testInputs) {
  try {
    const err = new AppError(input, details);
    console.log('✅ Created:', {
      code: err.code,
      message: err.message,
      status: err.status,
      details: err.details,
      name: err.name,
    });
  } catch (e) {
    console.log('❌ Failed:', { input, details, error: e.message });
  }
  console.log('---');
}

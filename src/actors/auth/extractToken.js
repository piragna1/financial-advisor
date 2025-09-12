export function extractToken(req){
    return req.headers.authorization;
}

const testCases = [
  {
    label: 'req is undefined',
    req: undefined,
    expected: undefined,
  },
  {
    label: 'req is null',
    req: null,
    expected: undefined,
  },
  {
    label: 'headers missing',
    req: {},
    expected: undefined,
  },
  {
    label: 'authorization is undefined',
    req: { headers: { authorization: undefined } },
    expected: undefined,
  },
  {
    label: 'authorization is null',
    req: { headers: { authorization: null } },
    expected: null,
  },
  {
    label: 'authorization is empty string',
    req: { headers: { authorization: '' } },
    expected: '',
  },
  {
    label: 'authorization is valid string',
    req: { headers: { authorization: 'Bearer abc.def.ghi' } },
    expected: 'Bearer abc.def.ghi',
  },
];

for (const test of testCases) {
  const result = extractToken(test.req);
  const pass = result === test.expected;
  console.log(pass ? `✅ ${test.label}` : `❌ ${test.label} → got ${result}, expected ${test.expected}`);
}

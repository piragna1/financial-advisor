import { AppError } from '../../errors/AppError.js';
import { AuthErrors } from '../../errors/authErrors';
export function tokenExists(req) {
    const header = req?.headers?.authorization;
    if (typeof header !== 'string') {
        throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN);
    }
    if ( header.trim()==='')  throw new AppError(AuthErrors.TOKEN.MISSING_TOKEN);
}

const testCases = [
  {
    label: "Header missing",
    req: {},
    expected: false,
  },
  {
    label: "Headers present but no authorization",
    req: { headers: {} },
    expected: false,
  },
  {
    label: "Authorization is null",
    req: { headers: { authorization: null } },
    expected: false,
  },
  {
    label: "Authorization is undefined",
    req: { headers: { authorization: undefined } },
    expected: false,
  },
  {
    label: "Authorization is empty string",
    req: { headers: { authorization: "" } },
    expected: true,
  },
  {
    label: "Authorization is valid string",
    req: { headers: { authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWY5OWI3Yi0zYTBiLTRmOTAtYWNmOC04NDEyZWFmZjViNTIiLCJpYXQiOjE3NTY5MTI1NTQsImV4cCI6MTc1NjkxNjE1NH0.zIz78NB4hXBinr2OLxm2zymOjA2CoO55UHEM-BU0mTM" } },
    expected: true,
  },
];

for (const test of testCases) {
    let result= false;
    try {
        result = tokenExists(test.req);
    } catch (error) {
        console.log('error has ocurred');
        console.log(error);
    }
  const pass = result === test.expected;
  console.log(
    pass
      ? `✅ ${test.label}`
      : `❌ ${test.label} → got ${result}, expected ${test.expected}`
  );
}

export default function errorHandler(err,req,res,next){
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    const code = err.code || 'UNHANDLED_ERROR';
    const details = err.details || null;
   return res.status(status).json(({error:message,code,details}));
}


// function mockResponse() {
//   const res = {};
//   res.statusCode = null;
//   res.body = null;
//   res.status = function (code) {
//     this.statusCode = code;
//     return this;
//   };
//   res.json = function (payload) {
//     this.body = payload;
//     return this;
//   };
//   return res;
// }

// function runTest(label, errInput, expectedStatus, expectedBody) {
//   const req = {};
//   const res = mockResponse();
//   const next = () => {};

//   errorHandler(errInput, req, res, next);

//   const statusMatch = res.statusCode === expectedStatus;
//   const bodyMatch = JSON.stringify(res.body) === JSON.stringify(expectedBody);

//   if (statusMatch && bodyMatch) {
//     console.log(`✅ ${label} → passed`);
//   } else {
//     console.error(`❌ ${label} → failed`);
//     console.error(`   Expected status: ${expectedStatus}, got: ${res.statusCode}`);
//     console.error(`   Expected body: ${JSON.stringify(expectedBody)}, got: ${JSON.stringify(res.body)}`);
//   }
// }

// const testCases = [
//   [
//     "error with full structure",
//     { status: 400, message: "Bad request", code: "BAD_REQUEST", details: { field: "email" } },
//     400,
//     { error: "Bad request", code: "BAD_REQUEST", details: { field: "email" } }
//   ],
//   [
//     "error with missing details",
//     { status: 401, message: "Unauthorized", code: "AUTH_FAIL" },
//     401,
//     { error: "Unauthorized", code: "AUTH_FAIL", details: null }
//   ],
//   [
//     "error with missing code",
//     { status: 403, message: "Forbidden" },
//     403,
//     { error: "Forbidden", code: "UNHANDLED_ERROR", details: null }
//   ],
//   [
//     "error with no status",
//     { message: "Something went wrong", code: "GENERIC" },
//     500,
//     { error: "Something went wrong", code: "GENERIC", details: null }
//   ],
//   [
//     "error with no fields",
//     {},
//     500,
//     { error: "Internal server error", code: "UNHANDLED_ERROR", details: null }
//   ]
// ];

// for (const [label, errInput, expectedStatus, expectedBody] of testCases) {
//   runTest(label, errInput, expectedStatus, expectedBody);
// }

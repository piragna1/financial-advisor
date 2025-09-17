export function invalidateUserToken(token) {
  token.signature = "invalid :P";
  return token;
}
import { invalidateUserToken } from "./user.service.js";

// 🧩 Atomic test cases
const testCases = [
  {
    label: "valid token with signature",
    input: {
      userId: "user-001",
      issuedAt: 1690000000,
      signature: "abc123",
    },
    expected: {
      signature: "invalid :P",
      preserve: ["userId", "issuedAt"],
    },
  },
  {
    label: "token with extra fields",
    input: {
      userId: "user-002",
      issuedAt: 1690000001,
      signature: "xyz789",
      role: "admin",
      expiresIn: 3600,
    },
    expected: {
      signature: "invalid :P",
      preserve: ["userId", "issuedAt", "role", "expiresIn"],
    },
  },
  {
    label: "token with empty signature",
    input: {
      userId: "user-003",
      issuedAt: 1690000002,
      signature: "",
    },
    expected: {
      signature: "invalid :P",
      preserve: ["userId", "issuedAt"],
    },
  },
  {
    label: "token with null signature",
    input: {
      userId: "user-004",
      issuedAt: 1690000003,
      signature: null,
    },
    expected: {
      signature: "invalid :P",
      preserve: ["userId", "issuedAt"],
    },
  },
  {
    label: "token with numeric signature",
    input: {
      userId: "user-005",
      issuedAt: 1690000004,
      signature: 123456,
    },
    expected: {
      signature: "invalid :P",
      preserve: ["userId", "issuedAt"],
    },
  },
  {
    label: "token with missing signature field",
    input: {
      userId: "user-006",
      issuedAt: 1690000005,
    },
    expected: {
      signature: "invalid :P",
      preserve: ["userId", "issuedAt"],
    },
  },
  {
    label: "token with nested structure",
    input: {
      userId: "user-007",
      issuedAt: 1690000006,
      signature: "nested-sig",
      meta: {
        ip: "192.168.0.1",
        device: "mobile",
      },
    },
    expected: {
      signature: "invalid :P",
      preserve: ["userId", "issuedAt", "meta"],
    },
  },
];

// 🧪 Runner
function runInvalidateUserTokenTests() {
  let passed = 0;
  let failed = 0;

  for (const { label, input, expected } of testCases) {
    const original = structuredClone(input);
    const result = invalidateUserToken(input);

    const isSameReference = result === input;
    const isSignatureCorrect = result.signature === expected.signature;

    const preservedFieldsIntact = expected.preserve.every((field) => {
      return result[field] === original[field];
    });

    const allPass =
      isSameReference && isSignatureCorrect && preservedFieldsIntact;

    if (allPass) {
      console.log(`✅ ${label}`);
      passed++;
    } else {
      console.error(`❌ ${label}`);
      if (!isSameReference)
        console.error(`   ✘ Returned object is not the same reference`);
      if (!isSignatureCorrect)
        console.error(
          `   ✘ Signature mismatch → expected: ${expected.signature}, got: ${result.signature}`
        );
      if (!preservedFieldsIntact) {
        expected.preserve.forEach((field) => {
          if (result[field] !== original[field]) {
            console.error(
              `   ✘ Field '${field}' was altered → expected: ${original[field]}, got: ${result[field]}`
            );
          }
        });
      }
      failed++;
    }
  }

  console.log(`\n🧾 Test summary: ${passed} passed, ${failed} failed`);
}

runInvalidateUserTokenTests();

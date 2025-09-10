import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";
import assert from 'assert'

export function buildUserEntity({
  id,
  name,
  lastName = "",
  email,
  hashedPassword,
}) {
  if (!id || !name || !email || !hashedPassword) {
    throw new AppError(AuthErrors.MISSING_CREDENTIALS);
  }
  if (
    typeof id != "string" ||
    typeof name != "string" ||
    typeof lastName != "string" ||
    typeof email != "string" ||
    typeof hashedPassword != "string"
  ) {
    throw new AppError(AuthErrors.INVALID_INPUT, "Format of data is invalid");
  }
  const user = {
    id,
    name,
    lastName,
    email,
    hashedPassword,
    createdAt: Date.now(),
  };
  return user;
}

;

function runBuildUserEntityTests() {
  const validInput = {
    id: '1',
    name: 'Gonzalo',
    lastName: 'Var',
    email: 'gonzalo@example.com',
    hashedPassword: 'abc123'
  };

  // ✅ Valid input
  assert.deepEqual(buildUserEntity(validInput).name, 'Gonzalo');

  // ❌ Missing fields
  assert.throws(() => buildUserEntity({ name: 'Gon', email: 'x', hashedPassword: 'x' }), AppError);
  assert.throws(() => buildUserEntity({ id: '1', email: 'x', hashedPassword: 'x' }), AppError);
  assert.throws(() => buildUserEntity({ id: '1', name: 'Gon', hashedPassword: 'x' }), AppError);
  assert.throws(() => buildUserEntity({ id: '1', name: 'Gon', email: 'x' }), AppError);

  // ❌ Invalid types
  assert.throws(() => buildUserEntity({ ...validInput, id: 123 }), AppError);
  assert.throws(() => buildUserEntity({ ...validInput, name: true }), AppError);
  assert.throws(() => buildUserEntity({ ...validInput, lastName: [] }), AppError);
  assert.throws(() => buildUserEntity({ ...validInput, email: {} }), AppError);
  assert.throws(() => buildUserEntity({ ...validInput, hashedPassword: null }), AppError);

  // ❌ Edge cases
  assert.throws(() => buildUserEntity({ ...validInput, id: '' }), AppError);
  assert.throws(() => buildUserEntity({ ...validInput, name: '   ' }), AppError);
  assert.throws(() => buildUserEntity({ ...validInput, email: '' }), AppError);
  assert.throws(() => buildUserEntity({ ...validInput, hashedPassword: '' }), AppError);

  // ✅ Unicode and optional field handling
  const unicodeInput = {
    id: '2',
    name: 'Gonzálø',
    lastName: 'Łópez',
    email: 'gon@example.com',
    hashedPassword: 'abc123'
  };
  assert.deepEqual(buildUserEntity(unicodeInput).lastName, 'Łópez');

  const noLastNameInput = {
    id: '3',
    name: 'Gon',
    email: 'gon@example.com',
    hashedPassword: 'abc123'
  };
  assert.deepEqual(buildUserEntity(noLastNameInput).lastName, '');
}

runBuildUserEntityTests();
console.log('✅ buildUserEntity test suite passed');

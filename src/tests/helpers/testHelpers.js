// src/tests/helpers/testHelpers.js

export function expectDateEqual(actual, expected) {
  const actualStr = new Date(actual).toISOString().slice(0, 10); // Always UTC
  expect(actualStr).toBe(expected);
}

export function expectNumericEqual(actual, expected) {
  expect(Number(actual)).toBe(expected);
}

export function expectScheduleMatch(actual, expected) {
  expect(actual.loan_id).toBe(expected.loanId);
  expect(actual.plan).toBe(expected.plan);
  expectDateEqual(actual.start_date, expected.startDate);
  expectNumericEqual(actual.total_amount, expected.totalAmount);
  expect(actual.currency).toBe(expected.currency);
  expect(actual.installments).toBe(expected.installments);
}

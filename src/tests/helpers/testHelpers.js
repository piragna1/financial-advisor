// src/tests/helpers/testHelpers.js

/**
 * Compara dos fechas por su parte YYYY-MM-DD,
 * leyendo la fecha en horario local.
 */
export function expectDateEqual(actual, expected) {
  const normalize = (input) => {
    const date = typeof input === "string" ? new Date(input) : input;
    const year  = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day   = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const actualStr = normalize(actual);
  const expectedStr = normalize(expected);

  expect(actualStr).toBe(expectedStr);
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

export async function expectErrorCode(promise, expectedCode) {
  await expect(promise).rejects.toMatchObject({ code: expectedCode });
}

export function utcDate(ymd) {
  const [year, month, day] = ymd.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function isValidUUID(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

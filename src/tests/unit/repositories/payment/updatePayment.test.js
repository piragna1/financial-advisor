import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import { createPayment, updatePayment } from "../../../../repositories/paymentRepository.js";
import { PaymentErrors } from "../../../../errors/paymentErrors.js";
import { expectErrorCode, expectDateEqual } from "../../../helpers/testHelpers.js";
import { normalizePaymentRow } from "../../../helpers/payment/normalizePaymentRow.js";

import {createMockUser} from '../../../../actors/users/createMockUser.js'

describe("updatePayment(payment)", () => {
  let payment;

  beforeEach(async () => {
    await pool.query("DELETE FROM payments;");
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");

    const userId = uuidv4();
    await createMockUser(userId);
    
    const financialProfileId = uuidv4();
    const loanId = uuidv4();
    const scheduleId = uuidv4();

    await pool.query(
      `INSERT INTO financial_profiles (id, user_id, salary, created_at, updated_at)
       VALUES ($1, $2, 5000, NOW(), NOW())`,
      [financialProfileId, userId]
    );

    await pool.query(
      `INSERT INTO loans (id, financial_profile_id, start_date, term_years, principal,
        interest_rate, payment_frequency_per_year, compounding_frequency_per_year,
        grace_period_months, balloon_payment, loan_type, currency,
        saved_at)
       VALUES ($1, $2, '2025-10-01', 5, 10000,
        0.07, 12, 12, 0, null, 'personal', 'USD', NOW())`,
      [loanId, financialProfileId]
    );

    await pool.query(
      `INSERT INTO schedules (id, plan, start_date, total_amount, currency, installments, loan_id, created_at, updated_at)
       VALUES ($1, 'monthly', '2025-10-01', 1000, 'USD', 2, $2, NOW(), NOW())`,
      [scheduleId, loanId]
    );

    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(dueDate.getDate() + 1);

    payment = await createPayment({
      id: uuidv4(),
      scheduleId,
      dueDate,
      amount: 500,
      currency: "USD",
      status: "pending",
      paidAt: null,
      method: "bank-transfer",
      reference: "TX-123",
      notes: "Initial payment"
    });
  });

  afterAll(async () => {
    await pool.query("DELETE FROM payments;");
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
  });

  const base = () => normalizePaymentRow(payment);

  it("updates amount and method", async () => {
    const updated = await updatePayment({ ...base(), amount: 750, method: "cash" });
    expect(Number(updated.amount)).toBe(750);
    expect(updated.method).toBe("cash");
  });

it("updates status to paid and sets paidAt", async () => {
  const paidAt = new Date();
  paidAt.setDate(paidAt.getDate() - 1); // fecha válida en el pasado

  const updated = await updatePayment({
    ...base(),
    amount: 500, // aseguramos que sea número
    status: "paid",
    paidAt
  });

  expect(updated.status).toBe("paid");
  expectDateEqual(updated.paid_at, paidAt);
});
it("updates status to pending and clears paidAt", async () => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

  const updated = await updatePayment({
    ...base(),
    dueDate,
    amount: 500, // aseguramos tipo numérico
    status: "pending",
    paidAt: null
  });

  expect(updated.status).toBe("pending");
  expect(updated.paid_at).toBeNull();
});


  it("rejects invalid UUID", async () => {
    await expectErrorCode(updatePayment({ ...base(), id: "invalid-id" }), PaymentErrors.UPDATE.INVALID_ID);
  });

it("rejects non-existent ID", async () => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

  const fakeId = uuidv4(); // ID válido pero inexistente

  await expectErrorCode(
    updatePayment({
      id: fakeId,
      scheduleId: uuidv4(),
      dueDate,
      amount: 500,
      currency: "USD",
      status: "pending",
      paidAt: null,
      method: "cash",
      reference: "ref123",
      notes: "test"
    }),
    PaymentErrors.UPDATE.NOT_FOUND
  );
});

 it("accepts paidAt before dueDate (early payment)", async () => {

  console.log('accepts paidAt before dueDate (early payment)')

  const paidAt = new Date();
  paidAt.setDate(paidAt.getDate() +21); // ayer

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

  const updated = await updatePayment({
    ...base(),
    dueDate,
    amount: 500,
    status: "paid",
    paidAt,
    currency: "USD",
    method: "cash",
    reference: "early",
    notes: "paid early"
  });

  expect(updated.status).toBe("paid");
  expectDateEqual(updated.paid_at, paidAt);
});


  it("rejects status: paid without paidAt", async () => {
    await expectErrorCode(
      updatePayment({ ...base(), status: "paid", paidAt: null }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects paidAt with status not paid", async () => {
    const paidAt = new Date();
    paidAt.setDate(paidAt.getDate() - 1);

    await expectErrorCode(
      updatePayment({ ...base(), status: "pending", paidAt }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects amount negative", async () => {
    await expectErrorCode(updatePayment({ ...base(), amount: -100 }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects currency invalid", async () => {
    await expectErrorCode(updatePayment({ ...base(), currency: "BTC" }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects method invalid", async () => {
    await expectErrorCode(updatePayment({ ...base(), method: "paypal" }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects status invalid", async () => {
    await expectErrorCode(updatePayment({ ...base(), status: "processing" }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects reference > 50 chars", async () => {
    await expectErrorCode(updatePayment({ ...base(), reference: "X".repeat(51) }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects notes > 255 chars", async () => {
    await expectErrorCode(updatePayment({ ...base(), notes: "N".repeat(256) }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects dueDate in the past", async () => {
    const past = new Date();
    past.setMonth(past.getMonth() - 1);

    await expectErrorCode(updatePayment({ ...base(), dueDate: past }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects dueDate less than one month ahead", async () => {
    const near = new Date();
    near.setDate(near.getDate() + 10);

    await expectErrorCode(updatePayment({ ...base(), dueDate: near }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects paidAt in the future", async () => {
    const future = new Date();
    future.setDate(future.getDate() + 10);

    await expectErrorCode(
      updatePayment({ ...base(), status: "paid", paidAt: future }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });
});

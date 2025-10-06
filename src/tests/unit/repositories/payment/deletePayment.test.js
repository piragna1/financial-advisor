import {
  deletePayment,
  createPayment,
  getPayment
} from "../../../../repositories/paymentRepository.js";
import { PaymentErrors } from "../../../../errors/paymentErrors.js";
import { expectErrorCode } from "../../../helpers/testHelpers.js";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("deletePayment(id)", () => {
  let userId, profileId, loanId, scheduleId, payment;

  beforeEach(async () => {
    await resetDatabase();
    userId = uuidv4();
    profileId = uuidv4();
    loanId = uuidv4();
    scheduleId = uuidv4();

    await pool.query(
      `INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)`,
      [userId, `test-${userId}@example.com`, "fake-hash"]
    );

    await pool.query(
      `INSERT INTO financial_profiles (id, user_id, salary, created_at) VALUES ($1, $2, $3, NOW())`,
      [profileId, userId, 50000]
    );

    await pool.query(
      `INSERT INTO loans (
        id, financial_profile_id, start_date, term_years, principal,
        interest_rate, payment_frequency_per_year, compounding_frequency_per_year,
        grace_period_months, loan_type, currency, saved_at
      ) VALUES (
        $1, $2, NOW(), 5, 10000, 5.5, 12, 12, 0, 'personal', 'USD', NOW()
      )`,
      [loanId, profileId]
    );

    await pool.query(
      `INSERT INTO schedules (
        id, loan_id, plan, start_date, total_amount, currency, installments, created_at, updated_at
      ) VALUES (
        $1, $2, 'monthly', CURRENT_DATE, 1000, 'USD', 12, NOW(), NOW()
      )`,
      [scheduleId, loanId]
    );

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 31);

    payment = await createPayment({
      id: uuidv4(),
      scheduleId,
      dueDate,
      amount: 500,
      currency: "USD",
      status: "pending",
      paidAt: null,
      method: "cash",
      reference: "to-delete",
      notes: "test delete"
    });
  });

  it("deletes an existing payment", async () => {
    const deleted = await deletePayment(payment.id);
    expect(deleted.id).toBe(payment.id);
  });

  it("rejects invalid UUID", async () => {
    await expectErrorCode(
      deletePayment("not-a-uuid"),
      PaymentErrors.DELETE.INVALID_ID
    );
  });

  it("rejects non-existent ID", async () => {
    await expectErrorCode(
      deletePayment(uuidv4()),
      PaymentErrors.DELETE.NOT_FOUND
    );
  });

  it("rejects second deletion of same payment", async () => {
    await deletePayment(payment.id);
    await expectErrorCode(
      deletePayment(payment.id),
      PaymentErrors.DELETE.NOT_FOUND
    );
  });

  it("ensures payment is no longer retrievable after deletion", async () => {
    await deletePayment(payment.id);
    const result = await pool.query(
      `SELECT * FROM payments WHERE id = $1`,
      [payment.id]
    );
    expect(result.rows.length).toBe(0);
  });

  it("deletes payment when schedule is deleted", async () => {
    await pool.query(`DELETE FROM schedules WHERE id = $1`, [scheduleId]);
    const result = await pool.query(
      `SELECT * FROM payments WHERE id = $1`,
      [payment.id]
    );
    expect(result.rows.length).toBe(0);
  });

  it("deletes payment when loan is deleted", async () => {
    await pool.query(`DELETE FROM loans WHERE id = $1`, [loanId]);
    const result = await pool.query(
      `SELECT * FROM payments WHERE id = $1`,
      [payment.id]
    );
    expect(result.rows.length).toBe(0);
  });

  it("deletes payment when financial profile is deleted", async () => {
  await pool.query(`DELETE FROM loans WHERE financial_profile_id = $1`, [profileId]);
  await pool.query(`DELETE FROM financial_profiles WHERE id = $1`, [profileId]);

  const result = await pool.query(
    `SELECT * FROM payments WHERE id = $1`,
    [payment.id]
  );
  expect(result.rows.length).toBe(0);
});
it("deletes payment when user is deleted", async () => {
  await pool.query(`DELETE FROM loans WHERE financial_profile_id = $1`, [profileId]);
  await pool.query(`DELETE FROM financial_profiles WHERE user_id = $1`, [userId]);
  await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

  const result = await pool.query(
    `SELECT * FROM payments WHERE id = $1`,
    [payment.id]
  );
  expect(result.rows.length).toBe(0);
});

});

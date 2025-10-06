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

  beforeEach(async () => {
    resetDatabase();
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

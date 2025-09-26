import { pool } from "../db/pool.js";
import { AppError } from "../errors/appError.js";
import { PaymentErrors } from "../errors/paymentErrors.js";
import { isValidUUID } from "../tests/helpers/testHelpers.js";

export async function createPayment(payment) {
  const {
    id,
    scheduleId,
    dueDate,
    amount,
    currency,
    status,
    paidAt,
    method,
    reference,
    notes
  } = payment;

  if (!isValidUUID(id) || !isValidUUID(scheduleId)) {
    throw new AppError(PaymentErrors.CREATE.INVALID_ID);
  }

  const result = await pool.query(
    `INSERT INTO payments (
      id, schedule_id, due_date, amount, currency,
      status, paid_at, method, reference, notes,
      saved_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      NOW(), NOW()
    ) RETURNING *`,
    [id, scheduleId, dueDate, amount, currency, status, paidAt, method, reference, notes]
  );

  return result.rows[0];
}

export async function getPayment(id) {
  if (!isValidUUID(id)) {
    throw new AppError(PaymentErrors.READ.INVALID_ID);
  }

  const result = await pool.query(
    `SELECT * FROM payments WHERE id = $1`,
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError(PaymentErrors.READ.NOT_FOUND);
  }

  return result.rows[0];
}

export async function updatePayment(payment) {
  const {
    id,
    scheduleId,
    dueDate,
    amount,
    currency,
    status,
    paidAt,
    method,
    reference,
    notes
  } = payment;

  if (!isValidUUID(id)) {
    throw new AppError(PaymentErrors.UPDATE.INVALID_ID);
  }

  const result = await pool.query(
    `UPDATE payments SET
      schedule_id = $2,
      due_date = $3,
      amount = $4,
      currency = $5,
      status = $6,
      paid_at = $7,
      method = $8,
      reference = $9,
      notes = $10,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *`,
    [id, scheduleId, dueDate, amount, currency, status, paidAt, method, reference, notes]
  );

  if (result.rowCount === 0) {
    throw new AppError(PaymentErrors.UPDATE.NOT_FOUND);
  }

  return result.rows[0];
}

export async function deletePayment(id) {
  if (!isValidUUID(id)) {
    throw new AppError(PaymentErrors.DELETE.INVALID_ID);
  }

  const result = await pool.query(
    `DELETE FROM payments WHERE id = $1 RETURNING *`,
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError(PaymentErrors.DELETE.NOT_FOUND);
  }

  return result.rows[0];
}

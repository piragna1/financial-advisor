import { normalizePayment } from "../actors/normalizers/payment/normalizePayment.js";
import { validatePaymentId } from "../actors/validators/payment/validatePaymentId.js";
import { validatePaymentInput } from "../actors/validators/payment/validatePaymentInput.js";
import { validatePaymentUpdate } from "../actors/validators/payment/validatePaymentUpdate.js";
import { pool } from "../db/pool.mjs";
import { AppError } from "../errors/appError.js";
import { PaymentErrors } from "../errors/paymentErrors.js";
import { isValidUUID } from "../tests/helpers/testHelpers.js";

export async function createPayment(payment) {


  // Validación semántica completa
  validatePaymentInput(payment);

  const { id, scheduleId } = payment;

  // Validación de formato UUID
  if (!isValidUUID(id) || !isValidUUID(scheduleId)) {
    throw new AppError(PaymentErrors.CREATE.INVALID_ID);
  }

  // Validación de existencia de schedule
  const { rows: scheduleRows } = await pool.query(
    "SELECT id FROM schedules WHERE id = $1",
    [scheduleId]
  );
  if (scheduleRows.length === 0) {
    throw PaymentErrors.CREATE.INVALID_ID;
  }

  // Validación de duplicado
  const { rows: existingPayment } = await pool.query(
    "SELECT id FROM payments WHERE id = $1",
    [id]
  );
  if (existingPayment.length > 0) {
    throw PaymentErrors.CREATE.INVALID_ID;
  }

  // INSERT final
  const {
    dueDate,
    amount,
    currency,
    status,
    paidAt,
    method,
    reference,
    notes,
  } = payment;

  const result = await pool.query(
    `INSERT INTO payments (
  id, schedule_id, due_date, amount, currency, status, paid_at, method, reference, notes
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
)

 RETURNING *`,
    [
      id,
      scheduleId,
      dueDate,
      amount,
      currency,
      status,
      paidAt,
      method,
      reference,
      notes,
    ]
  );

  return result.rows[0];
}

export async function getPayment(id) {
  validatePaymentId(id);

  const result = await pool.query(`SELECT * FROM payments WHERE id = $1`, [id]);

  if (result.rowCount === 0) {
    throw new AppError(PaymentErrors.READ.NOT_FOUND);
  }

  return normalizePayment(result.rows[0]);
}

export async function updatePayment(payment) {
  
  console.log('base payment received', payment)


  if (!isValidUUID(payment.id)) {
    throw new AppError(PaymentErrors.UPDATE.INVALID_ID);
  }

  validatePaymentUpdate(payment);

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
    notes,
  } = payment;

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
      notes = $10
    WHERE id = $1
    RETURNING *`,
    [
      id,
      scheduleId,
      dueDate,
      amount,
      currency,
      status,
      paidAt,
      method,
      reference,
      notes,
    ]
  );

  if (result.rowCount === 0) {
    throw new AppError(PaymentErrors.UPDATE.NOT_FOUND);
  }

  return result.rows[0];
}

export async function deletePayment(id) {
  console.log("Deleting payment ID:", id);

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

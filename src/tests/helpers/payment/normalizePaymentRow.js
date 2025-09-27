/**
 * Normalizes a payment object retrieved from the database
 * by converting its keys from snake_case to camelCase.
 *
 * @param {Object} row - Payment object with snake_case keys
 * @returns {Object} Object with camelCase keys
 */
export function normalizePaymentRow(row) {
  return {
    id: row.id,
    scheduleId: row.schedule_id,
    dueDate: row.due_date,
    amount: row.amount,
    currency: row.currency,
    status: row.status,
    paidAt: row.paid_at,
    method: row.method,
    reference: row.reference,
    notes: row.notes
  };
}

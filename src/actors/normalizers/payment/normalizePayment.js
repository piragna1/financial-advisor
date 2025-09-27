export function normalizePayment(row) {
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
    notes: row.notes,
    savedAt: row.saved_at,
    updatedAt: row.updated_at
  };
}

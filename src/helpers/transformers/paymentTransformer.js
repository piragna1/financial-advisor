// src/helpers/transformers/paymentTransformer.js

export function toCamelCasePayment(payment) {
  if (!payment) return {};

  return {
    id: payment.id,
    scheduleId: payment.schedule_id,
    dueDate: payment.due_date,
    amount: typeof payment.amount === "string" ? Number(payment.amount) : payment.amount,
    currency: payment.currency,
    status: payment.status,
    paidAt: payment.paid_at,
    method: payment.method,
    reference: payment.reference,
    notes: payment.notes,
  };
}

// src/helpers/transformers/paymentTransformer.js

export function toSnakeCasePayment(payment) {
  return {
    id: payment.id,
    schedule_id: payment.scheduleId ?? payment.schedule_id,
    due_date: payment.dueDate ?? payment.due_date,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    paid_at: payment.paidAt ?? payment.paid_at,
    method: payment.method,
    reference: payment.reference,
    notes: payment.notes,
  };
}
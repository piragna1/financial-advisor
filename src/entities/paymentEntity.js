import { v4 } from "uuid";

export function buildPaymentEntity(data) {
  if (!data.scheduleId) throw new Error("Schedule input is missing");
  if (typeof data.amount !== "number" || data.amount < 0)
    throw new Error("Payment amount is invalid");
  if (!data.method) throw new Error("Payment method is missing");
  if (!data.dueDate) throw new Error("Due date is missing");

  return {
    id: v4(),
    scheduleId: data.scheduleId,
    dueDate: data.dueDate,
    amount: data.amount,
    currency: data.currency || "USD",
    status: data.status || "pending",
    paidAt: data.status === "paid" ? Date.now() : undefined,
    method: data.method,
    reference: data.reference,
    notes: data.notes,
  };
}

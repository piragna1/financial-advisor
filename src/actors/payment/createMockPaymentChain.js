import { v4 as uuidv4 } from "uuid";
import { createMockScheduleChain } from "../schedule/createMockScheduleChain.js";
import { createPayment } from "../../repositories/paymentRepository.js";

export async function createMockPaymentChain(paymentOverrides = {}) {
  const { schedule, loan, financialProfile, user } = await createMockScheduleChain();



  // user -> (profile) -> fincancialProfile -> loan -> schedule -> payment
  const payment = await createPayment({
    id: paymentOverrides.id || uuidv4(),
    scheduleId: schedule.id,
    dueDate: paymentOverrides.dueDate || new Date("2025-11-01"),
    amount: paymentOverrides.amount || 500,
    currency: paymentOverrides.currency || "USD",
    status: paymentOverrides.status || "pending",
    paidAt: paymentOverrides.paidAt || null,
    method: paymentOverrides.method || "bank-transfer",
    reference: paymentOverrides.reference || "TX-123",
    notes: paymentOverrides.notes || "Initial payment"
  });

  return {
    payment,
    schedule,
    loan,
    financialProfile,
    user
  };
}

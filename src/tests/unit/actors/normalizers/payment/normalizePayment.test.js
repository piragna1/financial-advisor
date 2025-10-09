/*
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
*/

// src/tests/unit/normalizers/normalizePayment.test.js

import { normalizePayment } from "../../../../../actors/normalizers/payment/normalizePayment.js";


describe("normalizePayment(row)", () => {
  it("maps snake_case fields to camelCase", () => {
    const row = {
      id: "pay-001",
      schedule_id: "sch-123",
      due_date: "2025-11-01",
      amount: 1500,
      currency: "USD",
      status: "pending",
      paid_at: null,
      method: "bank_transfer",
      reference: "REF123",
      notes: "First installment",
      saved_at: "2025-10-01T10:00:00Z",
      updated_at: "2025-10-05T12:00:00Z"
    };

    const result = normalizePayment(row);

    expect(result).toEqual({
      id: "pay-001",
      scheduleId: "sch-123",
      dueDate: "2025-11-01",
      amount: 1500,
      currency: "USD",
      status: "pending",
      paidAt: null,
      method: "bank_transfer",
      reference: "REF123",
      notes: "First installment",
      savedAt: "2025-10-01T10:00:00Z",
      updatedAt: "2025-10-05T12:00:00Z"
    });
  });

  it("preserves null and undefined values", () => {
    const row = {
      id: "pay-002",
      schedule_id: null,
      due_date: undefined,
      amount: 0,
      currency: null,
      status: undefined,
      paid_at: null,
      method: undefined,
      reference: null,
      notes: undefined,
      saved_at: null,
      updated_at: undefined
    };

    const result = normalizePayment(row);

    expect(result.scheduleId).toBeNull();
    expect(result.dueDate).toBeUndefined();
    expect(result.amount).toBe(0);
    expect(result.currency).toBeNull();
    expect(result.status).toBeUndefined();
    expect(result.paidAt).toBeNull();
    expect(result.method).toBeUndefined();
    expect(result.reference).toBeNull();
    expect(result.notes).toBeUndefined();
    expect(result.savedAt).toBeNull();
    expect(result.updatedAt).toBeUndefined();
  });

  it("ignores extra fields not in the mapping", () => {
    const row = {
      id: "pay-003",
      schedule_id: "sch-999",
      extra_field: "should be ignored"
    };

    const result = normalizePayment(row);

    expect(result).toHaveProperty("id", "pay-003");
    expect(result).toHaveProperty("scheduleId", "sch-999");
    expect(result).not.toHaveProperty("extra_field");
  });
});
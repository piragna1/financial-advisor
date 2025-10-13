import {
  toCamelCasePayment,
  toSnakeCasePayment,
} from "../../../helpers/transformers/paymentTransformer.js";

describe("paymentTransformer", () => {
  describe("toCamelCasePayment", () => {
    it("converts snake_case to camelCase", () => {
      const input = {
        id: "pay-001",
        schedule_id: "sch-001",
        due_date: "2025-11-01",
        amount: "1500",
        currency: "ARS",
        status: "paid",
        paid_at: "2025-11-02",
        method: "bank_transfer",
        reference: "ref-xyz",
        notes: "Paid in full",
      };

      const result = toCamelCasePayment(input);
      expect(result.id).toBe("pay-001");
      expect(result.scheduleId).toBe("sch-001");
      expect(result.dueDate).toBe("2025-11-01");
      expect(result.amount).toBe(1500);
      expect(result.currency).toBe("ARS");
      expect(result.status).toBe("paid");
      expect(result.paidAt ?? null).toBe("2025-11-02");
      expect(result.method ?? null).toBe("bank_transfer");
      expect(result.reference ?? null).toBe("ref-xyz");
      expect(result.notes ?? null).toBe("Paid in full");
    });

    it("returns empty object for falsy input", () => {
      expect(toCamelCasePayment(null)).toEqual({});
      expect(toCamelCasePayment(undefined)).toEqual({});
    });

    it("preserves numeric amount", () => {
      const input = { amount: 2000 };
      const result = toCamelCasePayment(input);
      expect(result.amount).toBe(2000);
    });
  });

  describe("toSnakeCasePayment", () => {
    it("converts camelCase to snake_case", () => {
      const input = {
        id: "pay-002",
        scheduleId: "sch-002",
        dueDate: "2025-12-01",
        amount: 1000,
        currency: "USD",
        status: "pending",
        paidAt: null,
        method: "cash",
        reference: "ref-abc",
        notes: "Pending payment",
      };

      const result = toSnakeCasePayment(input);
      expect(result.id).toBe("pay-002");
      expect(result.schedule_id).toBe("sch-002");
      expect(result.due_date).toBe("2025-12-01");
      expect(result.amount).toBe(1000);
      expect(result.currency).toBe("USD");
      expect(result.status).toBe("pending");
      expect(result.paid_at ?? null).toBeNull();
      expect(result.method ?? null).toBe("cash");
      expect(result.reference ?? null).toBe("ref-abc");
      expect(result.notes ?? null).toBe("Pending payment");
    });

    it("falls back to snake keys if camel keys are missing", () => {
      const input = {
        schedule_id: "sch-003",
        due_date: "2025-12-15",
        paid_at: "2025-12-16",
      };

      const result = toSnakeCasePayment(input);
      expect(result.schedule_id).toBe("sch-003");
      expect(result.due_date).toBe("2025-12-15");
      expect(result.paid_at ?? null).toBe("2025-12-16");
    });
  });
});
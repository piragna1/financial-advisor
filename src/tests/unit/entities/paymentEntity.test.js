import { buildPaymentEntity } from "../../../entities/paymentEntity.js";

describe("buildPaymentEntity(data)", () => {
  describe("valid inputs", () => {
    it("builds entity with all fields provided and status 'paid'", () => {
      const input = {
        scheduleId: "sch-001",
        amount: 1500,
        method: "bank_transfer",
        dueDate: "2025-11-01",
        currency: "ARS",
        status: "paid",
        reference: "ref-xyz",
        notes: "Paid in full",
      };

      const result = buildPaymentEntity(input);
      expect(result).toMatchObject({
        scheduleId: "sch-001",
        amount: 1500,
        method: "bank_transfer",
        dueDate: "2025-11-01",
        currency: "ARS",
        status: "paid",
        reference: "ref-xyz",
        notes: "Paid in full",
      });
      expect(result.id).toMatch(/^[\da-f-]{36}$/);
      expect(typeof result.paidAt).toBe("number");
    });

    it("applies defaults when optional fields are missing", () => {
      const input = {
        scheduleId: "sch-002",
        amount: 500,
        method: "cash",
        dueDate: "2025-12-01",
      };

      const result = buildPaymentEntity(input);
      expect(result).toMatchObject({
        scheduleId: "sch-002",
        amount: 500,
        method: "cash",
        dueDate: "2025-12-01",
        currency: "USD",
        status: "pending",
        paidAt: undefined,
        reference: undefined,
        notes: undefined,
      });
    });
  });

  describe("invalid inputs", () => {
    it("throws if scheduleId is missing", () => {
      expect(() =>
        buildPaymentEntity({ amount: 100, method: "cash", dueDate: "2025-10-01" })
      ).toThrow("Schedule input is missing");
    });

    it("throws if amount is missing", () => {
      expect(() =>
        buildPaymentEntity({ scheduleId: "sch", method: "cash", dueDate: "2025-10-01" })
      ).toThrow("Payment amount is invalid");
    });

    it("throws if amount is negative", () => {
      expect(() =>
        buildPaymentEntity({ scheduleId: "sch", amount: -100, method: "cash", dueDate: "2025-10-01" })
      ).toThrow("Payment amount is invalid");
    });

    it("throws if amount is not a number", () => {
      expect(() =>
        buildPaymentEntity({ scheduleId: "sch", amount: "100", method: "cash", dueDate: "2025-10-01" })
      ).toThrow("Payment amount is invalid");
    });

    it("throws if method is missing", () => {
      expect(() =>
        buildPaymentEntity({ scheduleId: "sch", amount: 100, dueDate: "2025-10-01" })
      ).toThrow("Payment method is missing");
    });

    it("throws if dueDate is missing", () => {
      expect(() =>
        buildPaymentEntity({ scheduleId: "sch", amount: 100, method: "cash" })
      ).toThrow("Due date is missing");
    });
  });
});
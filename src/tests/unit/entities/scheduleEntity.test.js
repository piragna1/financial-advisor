import { buildScheduleEntity } from "../../../entities/scheduleEntity.js";

describe("buildScheduleEntity(data)", () => {
  describe("valid inputs", () => {
    it("builds schedule with all fields provided", () => {
      const input = {
        loanId: "loan-001",
        totalAmount: 10000,
        installments: 10,
        startDate: "2025-11-01",
        currency: "ARS",
      };

      const result = buildScheduleEntity(input);
      expect(result).toMatchObject({
        loanId: "loan-001",
        totalAmount: 10000,
        installments: 10,
        startDate: "2025-11-01",
        currency: "ARS",
      });
      expect(result.id).toMatch(/^[\da-f-]{36}$/);
      expect(typeof result.createdAt).toBe("number");
      expect(typeof result.updatedAt).toBe("number");
    });

    it("applies defaults when optional fields are missing", () => {
      const input = {
        loanId: "loan-002",
        totalAmount: 5000,
        installments: 5,
      };

      const result = buildScheduleEntity(input);
      expect(result).toMatchObject({
        loanId: "loan-002",
        totalAmount: 5000,
        installments: 5,
        currency: "USD",
      });
      expect(typeof result.startDate === "number" || result.startDate instanceof Date).toBe(true);
    });
  });

  describe("invalid inputs", () => {
    it("throws if loanId is missing", () => {
      expect(() =>
        buildScheduleEntity({ totalAmount: 1000, installments: 5 })
      ).toThrow("Loan id is missing");
    });

    it("throws if totalAmount is missing", () => {
      expect(() =>
        buildScheduleEntity({ loanId: "loan", installments: 5 })
      ).toThrow("Total amount is invalid");
    });

    it("throws if totalAmount is not a number", () => {
      expect(() =>
        buildScheduleEntity({ loanId: "loan", totalAmount: "1000", installments: 5 })
      ).toThrow("Total amount is invalid");
    });

    it("throws if totalAmount is zero", () => {
      expect(() =>
        buildScheduleEntity({ loanId: "loan", totalAmount: 0, installments: 5 })
      ).toThrow("Total amount is invalid");
    });

    it("throws if installments is missing", () => {
      expect(() =>
        buildScheduleEntity({ loanId: "loan", totalAmount: 1000 })
      ).toThrow("Installments amount is invalid");
    });

    it("throws if installments is not a number", () => {
      expect(() =>
        buildScheduleEntity({ loanId: "loan", totalAmount: 1000, installments: "5" })
      ).toThrow("Installments amount is invalid");
    });

    it("throws if installments is zero", () => {
      expect(() =>
        buildScheduleEntity({ loanId: "loan", totalAmount: 1000, installments: 0 })
      ).toThrow("Installments amount is invalid");
    });
  });
});
import { buildLoanEntity } from "../../../entities/loanEntity.js";

describe("buildLoanEntity(data)", () => {
  describe("valid inputs", () => {
    it("builds entity with all fields provided", () => {
      const input = {
        financialProfileId: "fp-123",
        principal: 10000,
        interestRate: 5.5,
        termYears: 10,
        startDate: "2025-01-01",
        balloonPayment: 500,
        paymentFrequencyPerYear: 4,
        compoundingFrequencyPerYear: 2,
        gracePeriodMonths: 3,
        loanType: "auto",
        currency: "ARS",
      };

      const result = buildLoanEntity(input);
      expect(result).toMatchObject({
        financialProfileId: "fp-123",
        principal: 10000,
        interestRate: 5.5,
        termYears: 10,
        startDate: "2025-01-01",
        balloonPayment: 500,
        paymentFrequencyPerYear: 4,
        compoundingFrequencyPerYear: 2,
        gracePeriodMonths: 3,
        loanType: "auto",
        currency: "ARS",
      });
      expect(result.id).toMatch(/^[\da-f-]{36}$/);
      expect(result.savedAt instanceof Date).toBe(true);
    });

    it("applies defaults when optional fields are missing", () => {
      const input = {
        financialProfileId: "fp-456",
        principal: 5000,
        interestRate: 3.2,
      };

      const result = buildLoanEntity(input);
      expect(result).toMatchObject({
        financialProfileId: "fp-456",
        principal: 5000,
        interestRate: 3.2,
        termYears: 1,
        paymentFrequencyPerYear: 12,
        compoundingFrequencyPerYear: 12,
        gracePeriodMonths: 0,
        balloonPayment: 0,
        loanType: "personal",
        currency: "USD",
      });
      expect(typeof result.startDate === "number" || result.startDate instanceof Date).toBe(true);
    });
  });

  describe("invalid inputs", () => {
    it("throws for null input", () => {
      expect(() => buildLoanEntity(null)).toThrow("Invalid input: data must be an object");
    });

    it("throws for non-object input", () => {
      expect(() => buildLoanEntity("invalid")).toThrow("Invalid input: data must be an object");
    });

    it("throws if financialProfileId is missing", () => {
      expect(() =>
        buildLoanEntity({ principal: 1000, interestRate: 5 })
      ).toThrow("Financial profile id missing");
    });

    it("throws for non-numeric principal", () => {
      expect(() =>
        buildLoanEntity({ financialProfileId: "fp", principal: "1000", interestRate: 5 })
      ).toThrow("Invalid principal input");
    });

    it("throws for principal <= 0", () => {
      expect(() =>
        buildLoanEntity({ financialProfileId: "fp", principal: 0, interestRate: 5 })
      ).toThrow("Invalid principal input");
    });

    it("throws for non-numeric interestRate", () => {
      expect(() =>
        buildLoanEntity({ financialProfileId: "fp", principal: 1000, interestRate: "5" })
      ).toThrow("Invalid interest rate input");
    });

    it("throws for interestRate <= 0", () => {
      expect(() =>
        buildLoanEntity({ financialProfileId: "fp", principal: 1000, interestRate: 0 })
      ).toThrow("Invalid interest rate input");
    });

    it("throws for invalid termYears", () => {
      expect(() =>
        buildLoanEntity({ financialProfileId: "fp", principal: 1000, interestRate: 5, termYears: "10" })
      ).toThrow("Invalid termYears input");
    });

    it("throws for invalid startDate", () => {
      expect(() =>
        buildLoanEntity({ financialProfileId: "fp", principal: 1000, interestRate: 5, startDate: "invalid" })
      ).toThrow("Invalid startDate input");
    });

    it("throws for non-numeric balloonPayment", () => {
      expect(() =>
        buildLoanEntity({ financialProfileId: "fp", principal: 1000, interestRate: 5, balloonPayment: "500" })
      ).toThrow("Invalid balloonPayment input");
    });
  });
});
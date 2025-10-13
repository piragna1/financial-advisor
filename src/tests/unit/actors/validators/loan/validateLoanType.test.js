import { validateLoanType } from "../../../../../actors/validators/loan/validateLoanType.js";
import { AppError } from "../../../../../errors/AppError.js";
import { LoanErrors } from "../../../../../errors/LoanErrors.js";

describe("validateLoanType(loanType)", () => {
  describe("valid inputs", () => {
    it("accepts 'personal'", () => {
      expect(() => validateLoanType("personal")).not.toThrow();
    });

    it("accepts 'mortgage'", () => {
      expect(() => validateLoanType("mortgage")).not.toThrow();
    });

    it("accepts 'auto'", () => {
      expect(() => validateLoanType("auto")).not.toThrow();
    });

    it("accepts 'education'", () => {
      expect(() => validateLoanType("education")).not.toThrow();
    });

    it("accepts 'business'", () => {
      expect(() => validateLoanType("business")).not.toThrow();
    });

    it("accepts uppercase variant", () => {
      expect(() => validateLoanType("PERSONAL")).not.toThrow();
    });

    it("accepts mixed case variant", () => {
      expect(() => validateLoanType("MoRtGaGe")).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws INVALID_LOAN_TYPE for unknown type", () => {
      expect(() => validateLoanType("vacation")).toThrow(AppError);
      try {
        validateLoanType("vacation");
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_LOAN_TYPE.code);
      }
    });

    it("throws INVALID_LOAN_TYPE.code for empty string", () => {
      expect(() => validateLoanType("")).toThrow(AppError);
      try {
        validateLoanType("");
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_LOAN_TYPE.code);
      }
    });

    it("throws INVALID_LOAN_TYPE.code for null", () => {
      expect(() => validateLoanType(null)).toThrow(AppError);
      try {
        validateLoanType(null);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_LOAN_TYPE.code);
      }
    });

    it("throws INVALID_LOAN_TYPE.code for undefined", () => {
      expect(() => validateLoanType(undefined)).toThrow(AppError);
      try {
        validateLoanType(undefined);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_LOAN_TYPE.code);
      }
    });

    it("throws INVALID_LOAN_TYPE.code for number", () => {
      expect(() => validateLoanType(123)).toThrow(AppError);
      try {
        validateLoanType(123);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_LOAN_TYPE.code);
      }
    });

    it("throws INVALID_LOAN_TYPE.code for object", () => {
      expect(() => validateLoanType({ type: "personal" })).toThrow(AppError);
      try {
        validateLoanType({ type: "personal" });
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_LOAN_TYPE.code);
      }
    });

    it("throws INVALID_LOAN_TYPE.code for array", () => {
      expect(() => validateLoanType(["personal"])).toThrow(AppError);
      try {
        validateLoanType(["personal"]);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_LOAN_TYPE.code);
      }
    });
  });
});
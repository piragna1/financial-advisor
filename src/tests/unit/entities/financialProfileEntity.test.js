import { buildFinancialProfileEntity } from "../../../entities/financialProfileEntity.js";
import { AppError } from "../../../errors/AppError.js";
import { FinancialErrors } from "../../../errors/financialProfileErrors.js";

describe("buildFinancialProfileEntity(data)", () => {
  it("builds entity with valid data", () => {
    const input = { id: "fp-001", userId: "user-123", salary: 5000 };
    const result = buildFinancialProfileEntity(input);
    expect(result).toMatchObject({
      userId: "user-123",
      salary: 5000,
    });
    expect(result.id).toEqual(expect.any(String));
  });

  it("throws INVALID_ID if id is missing", () => {
    const input = { userId: "user-123", salary: 5000 };
    expect(() => buildFinancialProfileEntity(input)).toThrow(AppError);
    try {
      buildFinancialProfileEntity(input);
    } catch (err) {
      expect(err.code).toBe(FinancialErrors.CREATE.INVALID_ID.code);
    }
  });

  it("throws INVALID_USER_ID if userId is missing", () => {
    const input = { id: "fp-001", salary: 5000 };
    expect(() => buildFinancialProfileEntity(input)).toThrow(AppError);
    try {
      buildFinancialProfileEntity(input);
    } catch (err) {
      expect(err.code).toBe(FinancialErrors.CREATE.INVALID_USER_ID.code);
    }
  });

  it("throws INVALID_SALARY if salary is missing", () => {
    const input = { id: "fp-001", userId: "user-123" };
    expect(() => buildFinancialProfileEntity(input)).toThrow(AppError);
    try {
      buildFinancialProfileEntity(input);
    } catch (err) {
      expect(err.code).toBe(FinancialErrors.CREATE.INVALID_SALARY.code);
    }
  });

  it("throws INVALID_SALARY if salary is zero", () => {
    const input = { id: "fp-001", userId: "user-123", salary: 0 };
    expect(() => buildFinancialProfileEntity(input)).toThrow(AppError);
    try {
      buildFinancialProfileEntity(input);
    } catch (err) {
      expect(err.code).toBe(FinancialErrors.CREATE.INVALID_SALARY.code);
    }
  });

  it("throws INVALID_SALARY if salary is negative", () => {
    const input = { id: "fp-001", userId: "user-123", salary: -100 };
    expect(() => buildFinancialProfileEntity(input)).toThrow(AppError);
    try {
      buildFinancialProfileEntity(input);
    } catch (err) {
      expect(err.code).toBe(FinancialErrors.CREATE.INVALID_SALARY.code);
    }
  });

  it("throws INVALID_SALARY if salary is not a number", () => {
    const input = { id: "fp-001", userId: "user-123", salary: "5000" };
    expect(() => buildFinancialProfileEntity(input)).toThrow(AppError);
    try {
      buildFinancialProfileEntity(input);
    } catch (err) {
      expect(err.code).toBe(FinancialErrors.CREATE.INVALID_SALARY.code);
    }
  });
});
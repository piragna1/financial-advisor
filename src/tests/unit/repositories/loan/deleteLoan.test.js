import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../db/pool.js";
import { saveLoan, deleteLoan, getLoans } from "../../../repositories/loanRepository.js";
import { createMockFinancialProfile } from "../../../actors/financialProfile/createMockFinancialProfile.js";
import { generateValidLoan } from "../../../actors/loan/generateValidLoan.js";

describe("deleteLoan(id) – cobertura total", () => {
  let profile, loan;

  beforeEach(async () => {
    profile = await createMockFinancialProfile();
    loan = generateValidLoan(profile.id);
    await saveLoan(loan);
  });

  afterEach(async () => {
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should delete a loan by id and return the deleted loan", async () => {
    const deleted = await deleteLoan(loan.id);
    expect(deleted).toBeDefined();
    expect(deleted.id).toBe(loan.id);

    const remaining = await getLoans();
    expect(remaining.find(l => l.id === loan.id)).toBeUndefined();
  });

  it("should return null if loan does not exist", async () => {
    const result = await deleteLoan(uuidv4());
    expect(result).toBeNull();
  });

  it("should throw if id is invalid", async () => {
    await expect(() => deleteLoan(null)).rejects.toThrow("Invalid loan id");
    await expect(() => deleteLoan(123)).rejects.toThrow("Invalid loan id");
    await expect(() => deleteLoan("")).rejects.toThrow("Invalid loan id");
  });

  it("should not affect other loans", async () => {
    const loanB = generateValidLoan(profile.id);
    await saveLoan(loanB);

    await deleteLoan(loan.id);
    const remaining = await getLoans();
    expect(remaining.length).toBe(1);
    expect(remaining[0].id).toBe(loanB.id);
  });

  it("should fail silently if deleted twice", async () => {
    await deleteLoan(loan.id);
    const secondAttempt = await deleteLoan(loan.id);
    expect(secondAttempt).toBeNull();
  });

  it("should preserve referential integrity", async () => {
    // Verifica que el perfil no se borra al eliminar el préstamo
    await deleteLoan(loan.id);
    const result = await pool.query("SELECT * FROM financial_profiles WHERE id = $1", [profile.id]);
    expect(result.rows.length).toBe(1);
  });

  it("should allow re-creating a loan with same financial profile after deletion", async () => {
    await deleteLoan(loan.id);
    const newLoan = generateValidLoan(profile.id);
    await expect(saveLoan(newLoan)).resolves.toBeDefined();
  });

  it("should not throw if loan was already manually deleted", async () => {
    await pool.query("DELETE FROM loans WHERE id = $1", [loan.id]);
    const result = await deleteLoan(loan.id);
    expect(result).toBeNull();
  });
});

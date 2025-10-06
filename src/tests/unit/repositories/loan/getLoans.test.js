import { getLoans, saveLoan } from "../../../../repositories/loanRepository.js";
import { createMockFinancialProfile } from "../../../../actors/financialProfile/createMockFinancialProfile.js";
import { generateValidLoan } from "../../../../actors/loan/generateValidLoan.js";
import { pool } from "../../../../db/pool.mjs";
import { v4 } from "uuid";
import {createMockUser} from '../../../../actors/users/createMockUser.js'
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("getLoans() – cobertura total", () => {
  let baseUserA, baseUserB,profileA, profileB;

  beforeAll(async () => {
    await resetDatabase();
    baseUserA = await createMockUser(v4());
    baseUserB = await createMockUser(v4());
    profileA = await createMockFinancialProfile({userId:baseUserA.id});
    profileB = await createMockFinancialProfile({userId:baseUserB.id});

    const loans = [
      generateValidLoan(profileA.id, {
        principal: 10000,
        interestRate: 5.5,
        loanType: "personal",
        currency: "USD",
        balloonPayment: 0,
        savedAt: new Date("2025-01-01")
      }),
      generateValidLoan(profileA.id, {
        principal: 20000,
        interestRate: 0.01, // ✅ válido
        loanType: "mortgage",
        currency: "EUR",
        balloonPayment: 5000,
        savedAt: new Date("2025-02-01")
      }),
      generateValidLoan(profileB.id, {
        principal: 15000,
        interestRate: 100,
        loanType: "auto",
        currency: "ARS",
        balloonPayment: null,
        savedAt: new Date("2025-03-01")
      })
    ];

    for (const loan of loans) {
      await saveLoan(loan);
    }
  });

  afterAll(async () => {
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should return all loans ordered by savedAt descending", async () => {
    const loans = await getLoans();
    expect(loans.length).toBeGreaterThanOrEqual(3);

    const timestamps = loans.map(l => new Date(l.saved_at).getTime());
    for (let i = 1; i < timestamps.length; i++) {
      expect(timestamps[i - 1]).toBeGreaterThanOrEqual(timestamps[i]);
    }
  });

  it("should include all expected fields with correct types", async () => {
    const loans = await getLoans();
    for (const loan of loans) {
      expect(typeof loan.id).toBe("string");
      expect(typeof loan.financial_profile_id).toBe("string");
      expect(typeof loan.principal).toBe("number");
      expect(typeof loan.interest_rate).toBe("number");
      expect(typeof loan.term_years).toBe("number");
      expect(typeof loan.payment_frequency_per_year).toBe("number");
      expect(typeof loan.compounding_frequency_per_year).toBe("number");
      expect(typeof loan.grace_period_months).toBe("number");
      expect(["number", "object"]).toContain(typeof loan.balloon_payment);
      expect(typeof loan.loan_type).toBe("string");
      expect(typeof loan.currency).toBe("string");
      expect(loan.saved_at).toBeInstanceOf(Date);
      expect(loan.start_date).toBeInstanceOf(Date);
    }
  });

  it("should include loans from multiple financial profiles", async () => {
    const loans = await getLoans();
    const profileIds = new Set(loans.map(l => l.financial_profile_id));
    expect(profileIds.has(profileA.id)).toBe(true);
    expect(profileIds.has(profileB.id)).toBe(true);
  });

  it("should handle edge values correctly", async () => {
    const loans = await getLoans();
    const lowInterest = loans.find(l => l.interest_rate === 0.01);
    const maxInterest = loans.find(l => l.interest_rate === 100);
    const nullBalloon = loans.find(l => l.balloon_payment === null);

    expect(lowInterest).toBeDefined();
    expect(maxInterest).toBeDefined();
    expect(nullBalloon).toBeDefined();
  });

  it("should return empty array if no loans exist", async () => {
    await pool.query("DELETE FROM loans;");
    const loans = await getLoans();
    expect(Array.isArray(loans)).toBe(true);
    expect(loans).toEqual([]);
  });
});

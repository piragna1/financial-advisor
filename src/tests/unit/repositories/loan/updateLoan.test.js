import { pool } from "../../../../db/pool.mjs";
import {createMockUser} from '../../../../actors/users/createMockUser'
import {createMockFinancialProfile} from '../../../../actors/financialProfile/createMockFinancialProfile'
import {generateValidLoan} from '../../../../actors/loan/generateValidLoan.js'
import {saveLoan} from '../../../../repositories/loanRepository.js'
import { updateLoan,getLoanById } from "../../../../repositories/loanRepository.js";
import { v4 } from "uuid";
import { AppError } from "../../../../errors/AppError.js";
import { LoanErrors } from "../../../../errors/loanErrors.js";
import { expectErrorCode } from "../../../helpers/testHelpers.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";


describe("updateLoan() — exhaustive suite", () => {
  let savedLoan;

  beforeAll(async () => {
    await resetDatabase();
  });

 afterAll(async () => {
});


  it("updates multiple fields and persists them", async () => {


      let baseUser = await createMockUser(v4());
    let baseFP = await createMockFinancialProfile({userId:baseUser.id});
    let savedLoan = saveLoan({
      id:v4(),
      financialProfileId:baseFP.id,
      startDate:new Date(),
      termYears:5,
      principal:50000,
      interestRate:0.5,
      paymentFrequencyPerYear:12,
      compoundingFrequencyPerYear:4,
      gracePeriodMonths:0,
      balloonPayment:5000,
      loanType:'personal',
      currency:'USD',
      savedAt:new Date()
    })


    const updates = {
      termYears: 30,
      principal: 250000,
      interestRate: 5.5,
      currency: "EUR"
    };
    const updated = await updateLoan(savedLoan.id, updates);
    expect(Number(updated.term_years)).toBe(30);
    expect(Number(updated.principal)).toBe(250000);
    expect(Number(updated.interest_rate)).toBe(5.5);
    expect(updated.currency).toBe("EUR");

    const fetched = await getLoanById(savedLoan.id);
    expect(Number(fetched.term_years)).toBe(30);
    expect(Number(fetched.principal)).toBe(250000);
    expect(Number(fetched.interest_rate)).toBe(5.5);
    expect(fetched.currency).toBe("EUR");
  });

  it("rejects non-numeric values for numeric fields", async () => {

  let baseUser = await createMockUser(v4());
    let baseFP = await createMockFinancialProfile({userId:baseUser.id});
    let savedLoan = saveLoan({
      id:v4(),
      financialProfileId:baseFP.id,
      startDate:new Date(),
      termYears:5,
      principal:50000,
      interestRate:0.5,
      paymentFrequencyPerYear:12,
      compoundingFrequencyPerYear:4,
      gracePeriodMonths:0,
      balloonPayment:5000,
      loanType:'personal',
      currency:'USD',
      savedAt:new Date()
    })

    await expect(() =>
      updateLoan(savedLoan.id, { interestRate: "five point five" })
    ).rejects.toThrow();
    await expect(() =>
      updateLoan(savedLoan.id, { principal: "💰" })
    ).rejects.toThrow();
  });

  it("rejects negative values where not allowed", async () => {

  let baseUser = await createMockUser(v4());
    let baseFP = await createMockFinancialProfile({userId:baseUser.id});
    let savedLoan = saveLoan({
      id:v4(),
      financialProfileId:baseFP.id,
      startDate:new Date(),
      termYears:5,
      principal:50000,
      interestRate:0.5,
      paymentFrequencyPerYear:12,
      compoundingFrequencyPerYear:4,
      gracePeriodMonths:0,
      balloonPayment:5000,
      loanType:'personal',
      currency:'USD',
      savedAt:new Date()
    })


    await expect(() =>
      updateLoan(savedLoan.id, { termYears: -10 })
    ).rejects.toThrow();
    await expect(() =>
      updateLoan(savedLoan.id, { interestRate: -1 })
    ).rejects.toThrow();
  });

  it("rejects unknown fields", async () => {

  let baseUser = await createMockUser(v4());
    let baseFP = await createMockFinancialProfile({userId:baseUser.id});
    let savedLoan = saveLoan({
      id:v4(),
      financialProfileId:baseFP.id,
      startDate:new Date(),
      termYears:5,
      principal:50000,
      interestRate:0.5,
      paymentFrequencyPerYear:12,
      compoundingFrequencyPerYear:4,
      gracePeriodMonths:0,
      balloonPayment:5000,
      loanType:'personal',
      currency:'USD',
      savedAt:new Date()
    });

    await expect(() =>
      updateLoan(savedLoan.id, { unknownField: "oops" })
    ).rejects.toThrow();
  });

  it("ignores null or undefined fields", async () => {
    
    const baseUser = await createMockUser(v4());
    const financialProfile = await createMockFinancialProfile({ userId: baseUser.id });
    const loanData = generateValidLoan(financialProfile.id);
    const savedLoan1 = await saveLoan(loanData);

    const updated = await updateLoan(savedLoan1.id, {
      termYears: 35,
      principal: null,
      interestRate: undefined
    });
    expect(updated.term_years).toBe(35);
    expect(updated.principal).toBe(savedLoan1.principal); // unchanged
    expect(updated.interest_rate).toBe(savedLoan1.interest_rate); // unchanged
  });

  it("throws for missing update object", async () => {
  let baseUser = await createMockUser(v4());
    let baseFP = await createMockFinancialProfile({userId:baseUser.id});
    let savedLoan = saveLoan({
      id:v4(),
      financialProfileId:baseFP.id,
      startDate:new Date(),
      termYears:5,
      principal:50000,
      interestRate:0.5,
      paymentFrequencyPerYear:12,
      compoundingFrequencyPerYear:4,
      gracePeriodMonths:0,
      balloonPayment:5000,
      loanType:'personal',
      currency:'USD',
      savedAt:new Date()
    });
    expectErrorCode(updateLoan(savedLoan.id, null), LoanErrors.UPDATE.MISSING_DATA);
  });

  it("throws for empty update object", async () => {
    let baseUser = await createMockUser(v4());
    let baseFP = await createMockFinancialProfile({userId:baseUser.id});
    let savedLoan = saveLoan({
      id:v4(),
      financialProfileId:baseFP.id,
      startDate:new Date(),
      termYears:5,
      principal:50000,
      interestRate:0.5,
      paymentFrequencyPerYear:12,
      compoundingFrequencyPerYear:4,
      gracePeriodMonths:0,
      balloonPayment:5000,
      loanType:'personal',
      currency:'USD',
      savedAt:new Date()
    });
    expectErrorCode(updateLoan(savedLoan.id, {}), {}, LoanErrors.UPDATE.MISSING_DATA);
  });

  it("throws for non-string ID", async () => {
    expectErrorCode(updateLoan(12345, {termYears:10}), LoanErrors.UPDATE.INVALID_LOAN_ID);
  });

  it("throws for nonexistent ID", async () => {
    
    expectErrorCode(updateLoan(v4(),{termYears:30}), LoanErrors.CREATION.MISSING_LOAN_ID);

});

});

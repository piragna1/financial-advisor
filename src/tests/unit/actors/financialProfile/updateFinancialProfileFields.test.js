/*
export function updateFinancialProfileFields(profile,updates){
    const allowed = ['salary'];
    const sanitized = {};
    for (key of allowed){
        if (key in updates){
            sanitized[key] = updates[key];
        }
    }
    if (Object.keys(sanitized) === 0 )
        throw new Error('No valid financial fields to update')

    return {
        ...profile,
        ...sanitized,
        updatedAt:Date.now()
    };
}
    
*/

// src/tests/unit/actors/financialProfile/updateFinancialProfileFields.test.js

import { updateFinancialProfileFields } from "../../../../actors/financialProfile/updateFinancialProfileFields.js";
import { FinancialErrors } from "../../../../errors/financialProfileErrors.js";

describe("updateFinancialProfileFields(profile, updates)", () => {
  it("updates allowed field 'salary'", () => {
    const profile = { id: "fp-001", salary: 5000, updatedAt: 0 };
    const updates = { salary: 6000 };

    const result = updateFinancialProfileFields(profile, updates);

    expect(result.salary).toBe(6000);
    expect(result.id).toBe("fp-001");
    expect(typeof result.updatedAt).toBe("number");
    expect(result.updatedAt).toBeGreaterThan(0);
  });

  it("throws error when updates contain no allowed fields", () => {
    const profile = { id: "fp-002", salary: 5000, updatedAt: 0 };
    const updates = { bonus: 1000, position: "Senior" };

    expect(() => updateFinancialProfileFields(profile, updates)).toThrow(FinancialErrors.UPDATE.NO_VALID_FIELDS);
  });

  it("throws error when updates is empty", () => {
    const profile = { id: "fp-003", salary: 5000, updatedAt: 0 };

    expect(() => updateFinancialProfileFields(profile, {})).toThrow(FinancialErrors.UPDATE.NO_VALID_FIELDS);
  });

  it("does not mutate original profile", () => {
    const profile = { id: "fp-004", salary: 5000, updatedAt: 0 };
    const updates = { salary: 7000 };

    const result = updateFinancialProfileFields(profile, updates);

    expect(profile.salary).toBe(5000); // original remains unchanged
    expect(result.salary).toBe(7000);
  });

  it("ignores fields not in 'allowed'", () => {
    const profile = { id: "fp-005", salary: 5000, updatedAt: 0 };
    const updates = { salary: 8000, title: "Manager" };

    const result = updateFinancialProfileFields(profile, updates);

    expect(result.salary).toBe(8000);
    expect(result.title).toBeUndefined();
  });
});
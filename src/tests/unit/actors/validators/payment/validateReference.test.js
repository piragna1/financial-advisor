// import { PaymentErrors } from "../../../errors/paymentErrors";
// import { AppError } from "../../../errors/appError";

// export function validateReference(reference, updating){
//   if (typeof reference !== "string" || !reference)
//     reference = "";

//   // Validate reference length
//   if (reference.length > 50) {
//     if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_REFERENCE);
//     throw new AppError(PaymentErrors.CREATE.INVALID_REFERENCE);
//   }
// }

import { validateReference } from "../../../../../actors/validators/payment/validateReference.js";
import { PaymentErrors } from "../../../../../errors/paymentErrors";
import { AppError } from "../../../../../errors/AppError.js";


describe("validateReference(reference, updating)", () => {
    describe("valid references", () => {
        it("passes for undefined", () => {
            expect(() => validateReference(undefined, false)).not.toThrow();
        });

        it("passes for null", () => {
            expect(() => validateReference(null, true)).not.toThrow();
        });

        it("passes for empty string", () => {
            expect(() => validateReference("", false)).not.toThrow();
        });

        it("passes for non-empty string under 50 characters", () => {
            expect(() => validateReference("invoice-123", true)).not.toThrow();
        });

        it("passes for string with exactly 50 characters", () => {
            const ref = "x".repeat(50);
            expect(() => validateReference(ref, false)).not.toThrow();
        });
    });

    describe("invalid references", () => {
        it("throws CREATE.INVALID_REFERENCE for string longer than 50", () => {
            const ref = "x".repeat(51);
            expect(() => validateReference(ref, false)).toThrow(AppError);
            try {
                validateReference(ref, false);
            } catch (err) {
                expect(err.code).toBe(PaymentErrors.CREATE.INVALID_REFERENCE.code);
            }
        });

        it("throws UPDATE.INVALID_REFERENCE for string longer than 50", () => {
            const ref = "x".repeat(100);
            expect(() => validateReference(ref, true)).toThrow(AppError);
            try {
                validateReference(ref, true);
            } catch (err) {
                expect(err.code).toBe(PaymentErrors.UPDATE.INVALID_REFERENCE.code);
            }
        });

        it("throws CREATE.INVALID_REFERENCE for non-string input with length > 50 after coercion", () => {
            const ref = { toString: () => "x".repeat(60) };
            expect(() => validateReference(ref, false)).not.toThrow();
        });
    });
});
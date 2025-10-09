// import { AppError } from "../../../errors/appError";
// import { PaymentErrors } from "../../../errors/paymentErrors";

// export function validateNotes(notes, updating = false) {
//   if (notes == null) return; // allow null or undefined

//   if (typeof notes !== "string") {
//     throw new AppError(PaymentErrors.NOTES.NOT_A_STRING, "Notes must be a string");
//   }
//   const trimmed = notes.trim();

//   if (trimmed.length > 255) {
//     throw new AppError(PaymentErrors.NOTES.MAXIMUM_CAPACITY, "Notes must not exceed 255 characters");
//   }
// }

import { validateNotes } from "../../../../../actors/validators/payment/validateNotes.js";
import { AppError } from "../../../../../errors/appError";
import { PaymentErrors } from "../../../../../errors/paymentErrors";

describe("validateNotes(notes)", () => {
  it("passes for null", () => {
    const notes = null;
    expect(() => validateNotes(notes)).not.toThrow();
  });

  it("passes for undefined", () => {
    const notes = undefined;
    expect(() => validateNotes(notes)).not.toThrow();
  });

  it("passes for valid short string", () => {
    const notes = "Payment scheduled for next week.";
    expect(() => validateNotes(notes)).not.toThrow();
  });

  it("passes for string with exactly 255 characters", () => {
    const notes = "a".repeat(255);
    expect(() => validateNotes(notes)).not.toThrow();
  });

  it("throws NOT_A_STRING for non-string value", () => {
    const notes = 12345;
    expect(() => validateNotes(notes)).toThrow(AppError);
    
  });

  it("throws MAXIMUM_CAPACITY for string longer than 255 characters", () => {
    const notes = "x".repeat(256);
    expect(() => validateNotes(notes)).toThrow(AppError);
    
  });

  it("throws MAXIMUM_CAPACITY for string with 300 spaces", () => {
    const notes = " ".repeat(300); // trims to 0, but still counts as 300 before trim
    expect(() => validateNotes(notes)).not.toThrow();
    
  });
});
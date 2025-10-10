import { validateCurrency } from "../../../../../actors/validators/loan/validateCurrency.js";
describe("validateCurrency(currency)", () => {

  describe("valid inputs", () => {
    it("accepts 'USD'", () => {
      expect(() => validateCurrency("USD")).not.toThrow();
    });

    it("accepts 'EUR'", () => {
      expect(() => validateCurrency("EUR")).not.toThrow();
    });

    it("accepts 'JPY'", () => {
      expect(() => validateCurrency("JPY")).not.toThrow();
    });
  });


  describe("invalid inputs", () => {
    it("throws for lowercase currency", () => {
      expect(() => validateCurrency("usd")).toThrow("Currency must be a 3-letter ISO code");
    });

    it("throws for too short currency", () => {
      expect(() => validateCurrency("US")).toThrow("Currency must be a 3-letter ISO code");
    });

    it("throws for too long currency", () => {
      expect(() => validateCurrency("USDA")).toThrow("Currency must be a 3-letter ISO code");
    });

    it("throws for number input", () => {
      expect(() => validateCurrency(123)).toThrow("Currency must be a 3-letter ISO code");
    });

    it("throws for null", () => {
      expect(() => validateCurrency(null)).toThrow("Currency must be a 3-letter ISO code");
    });

    it("throws for undefined", () => {
      expect(() => validateCurrency(undefined)).toThrow("Currency must be a 3-letter ISO code");
    });

    it("throws for object", () => {
      expect(() => validateCurrency({})).toThrow("Currency must be a 3-letter ISO code");
    });

    it("throws for array", () => {
      expect(() => validateCurrency(["USD"])).toThrow("Currency must be a 3-letter ISO code");
    });
  });
});
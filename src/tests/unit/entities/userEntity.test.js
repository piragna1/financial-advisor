import { buildUserEntity } from "../../../entities/userEntity.js";
import { AppError } from "../../../errors/AppError.js";
import { UserErrors } from "../../../errors/userErrors.js";

describe("buildUserEntity({ id, email, hashedPassword })", () => {
  describe("valid inputs", () => {
    it("builds user entity with correct fields", () => {
      const input = {
        id: "user-001",
        email: "gonzalo@example.com",
        hashedPassword: "hashed123",
      };

      const result = buildUserEntity(input);
      expect(result).toMatchObject({
        id: "user-001",
        email: "gonzalo@example.com",
        hashedPassword: "hashed123",
      });
      expect(typeof result.createdAt).toBe("number");
    });
  });

  describe("invalid inputs", () => {
    const invalidCases = [
      {},
      { id: "user-001" },
      { email: "gonzalo@example.com" },
      { hashedPassword: "hashed123" },
      { id: 123, email: "gonzalo@example.com", hashedPassword: "hashed123" },
      { id: "user-001", email: null, hashedPassword: "hashed123" },
      { id: "user-001", email: "gonzalo@example.com", hashedPassword: {} },
    ];

    invalidCases.forEach((input, index) => {
      it(`throws INVALID_INPUT for case #${index + 1}`, () => {
        expect(() => buildUserEntity(input)).toThrow(AppError);
        try {
          buildUserEntity(input);
        } catch (err) {
          expect(err.code).toBe(UserErrors.CREATE.INVALID_INPUT.code);
        }
      });
    });
  });
});
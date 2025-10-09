// export function loginResponse(user,token){
//     return {
//         token,
//         user
//     };
// }

// src/tests/unit/actors/auth/loginResponse.test.js

import { loginResponse } from "../../../../../actors/validators/auth/loginResponse.js";

describe("loginResponse(user, token)", () => {
  it("returns an object with token and user", () => {
    const user = { id: "user-001", email: "test@example.com" };
    const token = "abc123";

    const result = loginResponse(user, token);

    expect(result).toEqual({ token, user });
  });

  it("preserves token and user values", () => {
    const user = { name: "Clara" };
    const token = "secure-token";

    const result = loginResponse(user, token);

    expect(result.token).toBe("secure-token");
    expect(result.user).toEqual({ name: "Clara" });
  });

  it("handles null or undefined inputs", () => {
    expect(loginResponse(null, "t")).toEqual({ token: "t", user: null });
    expect(loginResponse(undefined, "t")).toEqual({ token: "t", user: undefined });
    expect(loginResponse({}, null)).toEqual({ token: null, user: {} });
  });

  it("does not mutate original user object", () => {
    const user = { id: "u1" };
    const copy = { ...user };
    loginResponse(user, "t");
    expect(user).toEqual(copy);
  });
});
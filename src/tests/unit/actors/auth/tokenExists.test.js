/* 

import { AppError } from '../../errors/AppError.js';
import { AuthErrors } from '../../errors/authErrors.js';
export function tokenExists(req) {
    const header = req?.headers?.authorization;
    if (typeof header !== 'string' ) {
        throw new AppError(AuthErrors.TOKEN.MISSING_TOKEN);
    }
    if ( header.trim()==='')  throw new AppError(AuthErrors.TOKEN.MISSING_TOKEN);
    return true;
}
    */


// src/tests/unit/validators/tokenExists.test.js

import { tokenExists } from "../../../../actors/auth/tokenExists.js";
import { AuthErrors } from "../../../../errors/authErrors.js";
import { AppError } from "../../../../errors/AppError.js";

describe("tokenExists(req)", () => {
  it("returns true when authorization header is present and non-empty", () => {
    const req = {
      headers: {
        authorization: "Bearer abc123"
      }
    };
    expect(tokenExists(req)).toBe(true);
  });

  it("throws MISSING_TOKEN when authorization header is missing", () => {
    const req = { headers: {} };
    expect(() => tokenExists(req)).toThrow(AppError);
    expect(() => tokenExists(req)).toThrow(AuthErrors.TOKEN.MISSING_TOKEN);
  });

  it("throws MISSING_TOKEN when headers object is missing", () => {
    const req = {};
    expect(() => tokenExists(req)).toThrow(AuthErrors.TOKEN.MISSING_TOKEN);
  });

  it("throws MISSING_TOKEN when authorization header is not a string", () => {
    const req = {
      headers: {
        authorization: 12345
      }
    };
    expect(() => tokenExists(req)).toThrow(AuthErrors.TOKEN.MISSING_TOKEN);
  });

  it("throws MISSING_TOKEN when authorization header is an empty string", () => {
    const req = {
      headers: {
        authorization: ""
      }
    };
    expect(() => tokenExists(req)).toThrow(AuthErrors.TOKEN.MISSING_TOKEN);
  });

  it("throws MISSING_TOKEN when authorization header is only whitespace", () => {
    const req = {
      headers: {
        authorization: "   "
      }
    };
    expect(() => tokenExists(req)).toThrow(AuthErrors.TOKEN.MISSING_TOKEN);
  });
});
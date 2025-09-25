import { pool } from "../db/pool.js";
import { AppError } from "../errors/AppError.js";
import { ProfileErrors } from "../errors/profileErrors.js";
import {createMockUser} from '../actors/users/createMockUser.js'

export async function createProfile(profile) {
  if (!profile || typeof profile !== "object") {
    throw new AppError(
      ProfileErrors.CREATE.INVALID_INPUT,
      "Profile must be a valid object"
    );
  }

  const {
    id,
    userId,
    firstName,
    lastName,
    birthDate,
    location,
    language,
    avatarUrl,
    bio,
  } = profile;

  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(
      ProfileErrors.CREATE.INVALID_ID,
      "Missing or invalid profile ID"
    );
  }

  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new AppError(
      ProfileErrors.CREATE.INVALID_USER_ID,
      "Missing or invalid user ID"
    );
  }

  if (!firstName || typeof firstName !== "string" || firstName.trim() === "") {
    throw new AppError(
      ProfileErrors.CREATE.INVALID_FIRST_NAME,
      "Missing or invalid first name"
    );
  }

  if (!lastName || typeof lastName !== "string" || lastName.trim() === "") {
    throw new AppError(
      ProfileErrors.CREATE.INVALID_LAST_NAME,
      "Missing or invalid last name"
    );
  }

  if (!bio || typeof bio !== "string" || bio.trim() === "") {
    throw new AppError(
      ProfileErrors.CREATE.INVALID_BIO,
      "Missing or invalid bio"
    );
  }

  const query = `
    INSERT INTO profiles (
      id,user_id, first_name, last_name, birth_date, location, language, avatar_url, bio, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8,$9, NOW(), NOW()
    ) RETURNING *;
  `;

  const values = [
    id,
    userId.trim(),
    firstName.trim(),
    lastName.trim(),
    birthDate ?? null,
    location ?? null,
    language ?? "en",
    avatarUrl ?? null,
    bio.trim(),
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getProfileByUserId(userId) {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new AppError(ProfileErrors.READ.INVALID_ID, "Missing or invalid user ID");
  }

  const query = `
    SELECT * FROM profiles
    WHERE user_id = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [userId.trim()]);

  if (result.rowCount === 0) {
    throw new AppError(ProfileErrors.READ.NOT_FOUND, "Profile not found");
  }

  return result.rows[0];
}

export async function updateProfile(profile) {
  if (!profile || typeof profile !== "object") {
    throw new AppError(ProfileErrors.UPDATE.INVALID_INPUT, "Profile must be a valid object");
  }

  const {
    id,
    firstName,
    lastName,
    birthDate,
    location,
    language,
    avatarUrl,
    bio
  } = profile;

  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(ProfileErrors.UPDATE.INVALID_ID, "Missing or invalid profile ID");
  }

  const query = `
    UPDATE profiles SET
      first_name = $1,
      last_name = $2,
      birth_date = $3,
      location = $4,
      language = $5,
      avatar_url = $6,
      bio = $7,
      updated_at = NOW()
    WHERE id = $8
    RETURNING *;
  `;

  const values = [
    firstName?.trim() ?? null,
    lastName?.trim() ?? null,
    birthDate ?? null,
    location ?? null,
    language ?? "en",
    avatarUrl ?? null,
    bio?.trim() ?? null,
    id.trim()
  ];

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    throw new AppError(ProfileErrors.UPDATE.NOT_FOUND, "Profile not found");
  }

  return result.rows[0];
}
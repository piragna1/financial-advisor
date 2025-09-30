// src/repositories/scheduleRepository.js

import { pool } from "../db/pool.mjs";
import { AppError } from "../errors/appError.js";
import { ScheduleErrors } from "../errors/scheduleErrors.js";
import { isValidUUID } from "../tests/helpers/testHelpers.js";

const ALLOWED_PLANS = ["weekly", "monthly", "custom"];

export async function createSchedule(schedule) {
  if (!schedule || typeof schedule !== "object") {
    throw new AppError(
      ScheduleErrors.CREATE.INVALID_INPUT,
      "Schedule must be a valid object"
    );
  }

  schedule.id = schedule.id.trim();

  const {
    id,
    loanId,
    plan,
    startDate,
    totalAmount,
    currency,
    installments
  } = schedule;

  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(
      ScheduleErrors.CREATE.INVALID_ID,
      "Missing or invalid schedule ID"
    );
  }

  if (!loanId || typeof loanId !== "string" || loanId.trim() === "") {
    throw new AppError(
      ScheduleErrors.CREATE.INVALID_LOAN_ID,
      "Missing or invalid loan ID"
    );
  }

  if (!plan || !ALLOWED_PLANS.includes(plan)) {
    throw new AppError(
      ScheduleErrors.CREATE.INVALID_PLAN,
      `Plan must be one of ${ALLOWED_PLANS.join(", ")}`
    );
  }

  const parsedDate = new Date(startDate);
  if (isNaN(parsedDate.getTime())) {
    throw new AppError(
      ScheduleErrors.CREATE.INVALID_START_DATE,
      "Missing or invalid start date"
    );
  }

  if (typeof totalAmount !== "number" || totalAmount <= 0) {
    throw new AppError(
      ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT,
      "Total amount must be a number > 0"
    );
  }

  if (!currency || typeof currency !== "string" || currency.trim() === "") {
    throw new AppError(
      ScheduleErrors.CREATE.INVALID_CURRENCY,
      "Missing or invalid currency"
    );
  }

  if (typeof installments !== "number" || installments <= 0) {
    throw new AppError(
      ScheduleErrors.CREATE.INVALID_INSTALLMENTS,
      "Installments must be a number > 0"
    );
  }

  const query = `
    INSERT INTO schedules (
      id, loan_id, plan, start_date, total_amount,
      currency, installments, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, NOW(), NOW()
    )
    RETURNING *;
  `;

  const values = [
    id.trim(),
    loanId.trim(),
    plan,
    parsedDate,
    totalAmount,
    currency.trim(),
    installments
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getScheduleById(id) {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(
      ScheduleErrors.READ.INVALID_ID,
      "Missing or invalid schedule ID"
    );
  }

  const result = await pool.query(
    `SELECT * FROM schedules WHERE id = $1 LIMIT 1;`,
    [id.trim()]
  );

  if (result.rowCount === 0) {
    throw new AppError(
      ScheduleErrors.READ.NOT_FOUND,
      "Schedule not found"
    );
  }

  return result.rows[0];
}

export async function updateSchedule(schedule) {
  if (!schedule || typeof schedule !== "object") {
    throw new AppError(
      ScheduleErrors.UPDATE.INVALID_INPUT,
      "Schedule must be a valid object"
    );
  }

  const {
    id,
    plan,
    startDate,
    totalAmount,
    currency,
    installments
  } = schedule;

  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(
      ScheduleErrors.UPDATE.INVALID_ID,
      "Missing or invalid schedule ID"
    );
  }

  if (plan && !ALLOWED_PLANS.includes(plan)) {
    throw new AppError(
      ScheduleErrors.UPDATE.INVALID_PLAN,
      `Plan must be one of ${ALLOWED_PLANS.join(", ")}`
    );
  }

  const parsedDate = startDate ? new Date(startDate) : null;
  if (startDate && isNaN(parsedDate.getTime())) {
    throw new AppError(
      ScheduleErrors.UPDATE.INVALID_START_DATE,
      "Invalid start date"
    );
  }

  if (
    totalAmount !== undefined &&
    (typeof totalAmount !== "number" || totalAmount <= 0)
  ) {
    throw new AppError(
      ScheduleErrors.UPDATE.INVALID_TOTAL_AMOUNT,
      "Total amount must be a number > 0"
    );
  }

  if (
    currency !== undefined &&
    (typeof currency !== "string" || currency.trim() === "")
  ) {
    throw new AppError(
      ScheduleErrors.UPDATE.INVALID_CURRENCY,
      "Invalid currency"
    );
  }

  if (
    installments !== undefined &&
    (typeof installments !== "number" || installments <= 0)
  ) {
    throw new AppError(
      ScheduleErrors.UPDATE.INVALID_INSTALLMENTS,
      "Installments must be a number > 0"
    );
  }

  const query = `
    UPDATE schedules SET
      plan        = COALESCE($1, plan),
      start_date  = COALESCE($2, start_date),
      total_amount= COALESCE($3, total_amount),
      currency    = COALESCE($4, currency),
      installments= COALESCE($5, installments),
      updated_at  = NOW()
    WHERE id = $6
    RETURNING *;
  `;

  const values = [
    plan,
    parsedDate,
    totalAmount,
    currency?.trim(),
    installments,
    id.trim()
  ];

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    throw new AppError(
      ScheduleErrors.UPDATE.NOT_FOUND,
      "Schedule not found"
    );
  }

  return result.rows[0];
}

export async function deleteSchedule(id) {
  const trimmedId = typeof id === "string" ? id.trim() : "";

  if (!trimmedId || !isValidUUID(trimmedId)) {
    throw new AppError(ScheduleErrors.DELETE.INVALID_ID, "Missing or invalid schedule ID");
  }

  const result = await pool.query(
    `DELETE FROM schedules WHERE id = $1 RETURNING *;`,
    [trimmedId]
  );

  if (result.rowCount === 0) {
    throw new AppError(ScheduleErrors.DELETE.NOT_FOUND, "Schedule not found");
  }

  return result.rows[0];
}

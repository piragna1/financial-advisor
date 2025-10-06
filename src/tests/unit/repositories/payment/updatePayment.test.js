import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import { createPayment, updatePayment } from "../../../../repositories/paymentRepository.js";
import { PaymentErrors } from "../../../../errors/paymentErrors.js";
import { expectErrorCode, expectDateEqual } from "../../../helpers/testHelpers.js";
import { normalizePaymentRow } from "../../../helpers/payment/normalizePaymentRow.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

import {createMockUser} from '../../../../actors/users/createMockUser.js'

describe("updatePayment(payment)", () => {
  let payment;

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
  });

  const base = () => normalizePaymentRow(payment);

  it("updates amount and method", async () => {
    const updated = await updatePayment({ ...base(), amount: 750, method: "cash" });
    expect(Number(updated.amount)).toBe(750);
    expect(updated.method).toBe("cash");
  });

it("updates status to paid and sets paidAt", async () => {
  const paidAt = new Date();
  paidAt.setDate(paidAt.getDate() - 1); // fecha válida en el pasado

  const updated = await updatePayment({
    ...base(),
    amount: 500, // aseguramos que sea número
    status: "paid",
    paidAt
  });

  expect(updated.status).toBe("paid");
  expectDateEqual(updated.paid_at, paidAt);
});
it("updates status to pending and clears paidAt", async () => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

  const updated = await updatePayment({
    ...base(),
    dueDate,
    amount: 500, // aseguramos tipo numérico
    status: "pending",
    paidAt: null
  });

  expect(updated.status).toBe("pending");
  expect(updated.paid_at).toBeNull();
});


  it("rejects invalid UUID", async () => {
    await expectErrorCode(updatePayment({ ...base(), id: "invalid-id" }), PaymentErrors.UPDATE.INVALID_ID);
  });

it("rejects non-existent ID", async () => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

  const fakeId = uuidv4(); // ID válido pero inexistente

  await expectErrorCode(
    updatePayment({
      id: fakeId,
      scheduleId: uuidv4(),
      dueDate,
      amount: 500,
      currency: "USD",
      status: "pending",
      paidAt: null,
      method: "cash",
      reference: "ref123",
      notes: "test"
    }),
    PaymentErrors.UPDATE.NOT_FOUND
  );
});

 it("accepts paidAt before dueDate (early payment)", async () => {

  console.log('accepts paidAt before dueDate (early payment)')

  const paidAt = new Date();
  paidAt.setDate(paidAt.getDate() +21); // ayer

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

  const updated = await updatePayment({
    ...base(),
    dueDate,
    amount: 500,
    status: "paid",
    paidAt,
    currency: "USD",
    method: "cash",
    reference: "early",
    notes: "paid early"
  });

  expect(updated.status).toBe("paid");
  expectDateEqual(updated.paid_at, paidAt);
});


  it("rejects status: paid without paidAt", async () => {
    await expectErrorCode(
      updatePayment({ ...base(), status: "paid", paidAt: null }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects paidAt with status not paid", async () => {
    const paidAt = new Date();
    paidAt.setDate(paidAt.getDate() - 1);

    await expectErrorCode(
      updatePayment({ ...base(), status: "pending", paidAt }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects amount negative", async () => {
    await expectErrorCode(updatePayment({ ...base(), amount: -100 }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects currency invalid", async () => {
    await expectErrorCode(updatePayment({ ...base(), currency: "BTC" }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects method invalid", async () => {
    await expectErrorCode(updatePayment({ ...base(), method: "paypal" }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects status invalid", async () => {
    await expectErrorCode(updatePayment({ ...base(), status: "processing" }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects reference > 50 chars", async () => {
    await expectErrorCode(updatePayment({ ...base(), reference: "X".repeat(51) }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects notes > 255 chars", async () => {
    await expectErrorCode(updatePayment({ ...base(), notes: "N".repeat(256) }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects dueDate in the past", async () => {
    const past = new Date();
    past.setMonth(past.getMonth() - 1);

    await expectErrorCode(updatePayment({ ...base(), dueDate: past }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects dueDate less than one month ahead", async () => {
    const near = new Date();
    near.setDate(near.getDate() + 10);

    await expectErrorCode(updatePayment({ ...base(), dueDate: near }), PaymentErrors.UPDATE.INVALID_DATA);
  });

  it("rejects paidAt in the future", async () => {
    const future = new Date();
    future.setDate(future.getDate() + 10);

    await expectErrorCode(
      updatePayment({ ...base(), status: "paid", paidAt: future }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });
});

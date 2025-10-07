import { v4 as uuidv4, v4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  createPayment,
  updatePayment,
} from "../../../../repositories/paymentRepository.js";
import { PaymentErrors } from "../../../../errors/paymentErrors.js";
import {
  expectErrorCode,
  expectDateEqual,
} from "../../../helpers/testHelpers.js";
import { normalizePaymentRow } from "../../../helpers/payment/normalizePaymentRow.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";
import { createMockScheduleChain } from "../../../../actors/schedule/createMockScheduleChain.js";

describe("updatePayment(payment)", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {});

  it("updates amount and method", async () => {

     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    const updated = await updatePayment({
      ...base,
      amount: 750,
      method: "cash",
    });
    expect(Number(updated.amount)).toBe(750);
    expect(updated.method).toBe("cash");
  });

  it("updates status to paid and sets paidAt", async () => {


     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    const paidAt = new Date();
    paidAt.setDate(paidAt.getDate() - 1); // fecha válida en el pasado

    const updated = await updatePayment({
      ...base,
      amount: 500, // aseguramos que sea número
      status: "paid",
      paidAt,
    });

    expect(updated.status).toBe("paid");
    expectDateEqual(updated.paid_at, paidAt);
  });
  it("updates status to pending and clears paidAt", async () => {


 let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

    const updated = await updatePayment({
      ...base,
      dueDate,
      amount: 500, // aseguramos tipo numérico
      status: "pending",
      paidAt: null,
    });

    expect(updated.status).toBe("pending");
    expect(updated.paid_at).toBeNull();
  });

  it("rejects invalid UUID", async () => {
    await expectErrorCode(
      updatePayment({ ...base, id: "invalid-id" }),
      PaymentErrors.UPDATE.INVALID_ID
    );
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
        notes: "test",
      }),
      PaymentErrors.UPDATE.NOT_FOUND
    );
  });

  it("accepts paidAt before dueDate (early payment)", async () => {


 let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });

    const paidAt = new Date();
    paidAt.setDate(paidAt.getDate() + 21); // ayer

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

    const updated = await updatePayment({
      ...base,
      dueDate,
      amount: 500,
      status: "paid",
      paidAt,
      currency: "USD",
      method: "cash",
      reference: "early",
      notes: "paid early",
    });

    expect(updated.status).toBe("paid");
    expectDateEqual(updated.paid_at, paidAt);
  });

  it("rejects status: paid without paidAt", async () => {

     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, status: "paid", paidAt: null }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects paidAt with status not paid", async () => {

     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    const paidAt = new Date();
    paidAt.setDate(paidAt.getDate() - 1);

    await expectErrorCode(
      updatePayment({ ...base, status: "pending", paidAt }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects amount negative", async () => {

     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, amount: -100 }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects currency invalid", async () => {


     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, currency: "BTC" }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects method invalid", async () => {
     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, method: "paypal" }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects status invalid", async () => {
     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, status: "processing" }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects reference > 50 chars", async () => {
     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, reference: "X".repeat(51) }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects notes > 255 chars", async () => {
     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, notes: "N".repeat(256) }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects dueDate in the past", async () => {
     let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date().getDate() + 30,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date().getDay() + 1,
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });
    const past = new Date();
    past.setMonth(past.getMonth() - 1);

    await expectErrorCode(
      updatePayment({ ...base(), dueDate: past }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects dueDate less than one month ahead", async () => {
    
    let schedule = createMockScheduleChain();
    let base = createPayment({
      id: uuidv4(),
      scheduleId: schedule.schedule.id,
    });

    const near = new Date();
    near.setDate(near.getDate() + 10);

    await expectErrorCode(
      updatePayment({ ...base, dueDate: near }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects paidAt in the future", async () => {
    console.log("rejects paidAt in the future");

    let { schedule, loanId, loan,financialProfile,user } = await createMockScheduleChain();

    if (!schedule) throw new Error("Error while creating a schedule");

    let base =await createPayment({
      id: v4(),
      scheduleId: schedule.id,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // ✅ ,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date(),
      method: "cash",
      reference: '',
      notes: "paid with cash",
    });

    const future = new Date();
    future.setDate(future.getDate() + 100);
    base.paidAt = future;

    await expectErrorCode(
      updatePayment(base),
      PaymentErrors.UPDATE.INVALID_DATA
    );
    
  });
});

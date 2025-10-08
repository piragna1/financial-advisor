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
import { toCamelCasePayment } from "../../../../helpers/transformers/paymentTransformer.js";

describe("updatePayment(payment)", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {});

  it("updates amount and method", async () => {
    let { schedule } = await createMockScheduleChain();


    let futureDueDate, paidAtDate;
    futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30)
    paidAtDate = new Date();

    let base = await createPayment({
      id: v4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });

    base = toCamelCasePayment(base);

    const updated = await updatePayment({
      ...base,
      amount: 750,
      method: "credit-card",
      notes:'paid with credit card'
    });
expect(updated.notes).toBe("paid with credit card");
expect(updated.amount).not.toBe(base.amount);
expect(updated.method).not.toBe(base.method);
  });

  it("updates status to paid and sets paidAt", async () => {
    let { schedule } = await createMockScheduleChain();
    let futureDueDate = new Date();
    let paidAtDate = new Date();
    let base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
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


    let { schedule } = await createMockScheduleChain();

    let futureDueDate = new Date(), paidAtDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30);

    let base = await createPayment({
      id: v4(),
      scheduleId: schedule.id,
      dueDate:futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt:paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 31); // mínimo un mes en el futuro

    const updated = await updatePayment({
      ...base,
      dueDate,
      amount: 500, // aseguramos tipo numérico
      status: "pending",
    });

    expect(updated.status).toBe("pending");
    expect(updated.paid_at).toBeNull();
  });

  it("rejects invalid UUID", async () => {
    let { schedule } = await createMockScheduleChain();
    let futureDueDate, paidAtDate;
    futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30);
    paidAtDate = new Date();

    let base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });

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

    console.log('accepts paidAt before dueDate (early payment)')

    let { schedule } = await createMockScheduleChain();

    let futureDueDate = new Date(),
      paidAtDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30);

    let base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });

    console.log('base 1', base)

    const paidAt = new Date();
    paidAt.setDate(paidAt.getDate() + 21);

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 31); 

    base = toCamelCasePayment(base);
    console.log('base 2', base)

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
    let { schedule } = await createMockScheduleChain();

    let futureDueDate, paidAtDate;
    futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30);
    paidAtDate = new Date();
    let base = await createPayment({
      id: v4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });

    await expectErrorCode(
      updatePayment({ ...base, status: "paid", paidAt: null }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects paidAt with status not paid", async () => {
    let { schedule } = await createMockScheduleChain();

    let futureDueDate, paidAtDate;
    futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30);
    paidAtDate = new Date();

    let base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
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
    let { schedule } = await createMockScheduleChain();

    let futureDueDate, paidAtDate;
    futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30);
    paidAtDate = new Date();

    let base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, amount: -100 }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects currency invalid", async () => {
    let { schedule } = await createMockScheduleChain();

    const futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30);

    const paidAtDate = new Date();

    let base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, currency: "BTC" }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects method invalid", async () => {
    const { schedule } = await createMockScheduleChain();
    if (!schedule?.id) throw new Error("Failed to create schedule");

    const futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30); // 30 días adelante

    const paidAtDate = new Date(); // fecha válida actual

    const base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });

    await expectErrorCode(
      updatePayment({ ...base, method: "paypal" }), // método inválido
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });
  it("rejects status invalid", async () => {
    const { schedule } = await createMockScheduleChain();
    if (!schedule?.id) throw new Error("Failed to create schedule");

    const futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 30); // 30 días adelante

    const paidAtDate = new Date(); // fecha válida actual

    const base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: futureDueDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: paidAtDate,
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });

    await expectErrorCode(
      updatePayment({ ...base, status: "processing" }), // status inválido
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects reference > 50 chars", async () => {
    let { schedule } = await createMockScheduleChain();
    let base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date(),
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date(),
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, reference: "X".repeat(51) }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects notes > 255 chars", async () => {
    let { schedule } = await createMockScheduleChain();
    let base = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: new Date(),
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date(),
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });
    await expectErrorCode(
      updatePayment({ ...base, notes: "N".repeat(256) }),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects dueDate in the past", async () => {
    const { schedule } = await createMockScheduleChain();
    if (!schedule?.id) throw new Error("Failed to create schedule");

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 6); // 6 días atrás

    const payment = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: pastDate,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date(), // fecha válida
      method: "cash",
      reference: "",
      notes: "paid with cash",
    });

    await expectErrorCode(
      updatePayment(payment),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects dueDate less than one month ahead", async () => {
    const { schedule } = await createMockScheduleChain();
    if (!schedule?.id) throw new Error("Failed to create schedule");

    const nearDueDate = new Date();
    nearDueDate.setDate(nearDueDate.getDate() + 10); // 10 días adelante

    const payment = await createPayment({
      id: uuidv4(),
      scheduleId: schedule.id,
      dueDate: nearDueDate,
      amount: 1000,
      currency: "USD",
      status: "pending",
      method: "cash",
      reference: "",
      notes: "testing near dueDate",
    });

    await expectErrorCode(
      updatePayment(payment),
      PaymentErrors.UPDATE.INVALID_DATA
    );
  });

  it("rejects paidAt in the future", async () => {
    let { schedule, loanId, loan, financialProfile, user } =
      await createMockScheduleChain();

    if (!schedule) throw new Error("Error while creating a schedule");

    let base = await createPayment({
      id: v4(),
      scheduleId: schedule.id,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // ✅ ,
      amount: 1000,
      currency: "USD",
      status: "paid",
      paidAt: new Date(),
      method: "cash",
      reference: "",
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

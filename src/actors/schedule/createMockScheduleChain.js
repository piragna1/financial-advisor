import { v4 as uuidv4 } from "uuid";
import {createMockUser} from '../users/createMockUser'
import { createMockFinancialProfile } from "../financialProfile/createMockFinancialProfile";
import { createMockLoan } from "../loan/createMockLoan";
import { createSchedule } from "../../repositories/scheduleRepository";

export async function createMockScheduleChain(scheduleOverrides = {}) {
  const user = await createMockUser(uuidv4());
  console.log('created mock user. Let us check the id of it')
  console.log(user)
  console.log(user.id)

  const financialProfile = await createMockFinancialProfile({userId:user.id});

  const loan = await createMockLoan(uuidv4(), financialProfile.id);

  const schedule = await createSchedule({
    id: scheduleOverrides.id || uuidv4(),
    loanId: loan.id,
    plan: "weekly",
    startDate: "2025-08-01",
    totalAmount: 800,
    currency: "USD",
    installments: 8,
    ...scheduleOverrides,
  });

  return {
    schedule,
    loanId: loan.id, // ← mantiene compatibilidad
    loan,
    financialProfile,
    user
  };
}

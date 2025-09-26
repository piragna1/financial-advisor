import { v4 as uuidv4 } from "uuid";
import {createMockUser} from '../users/createMockUser'
import { createMockFinancialProfile } from "../financialProfile/createMockFinancialProfile";
import { createMockLoan } from "../loan/createMockLoan";
import { createSchedule } from "../../repositories/scheduleRepository";

export async function createMockScheduleChain(scheduleOverrides = {}){
    const user = await createMockUser(uuidv4());

    const financialProfile = await createMockFinancialProfile(user.id);

    const loanId = uuidv4();
    const loan =await createMockLoan(loanId, financialProfile.id);

    const scheduleId = scheduleOverrides.id || uuidv4();

    const schedule = await createSchedule({
        id:scheduleId,
        loanId,
        plan:'weekly',
        startDate:'2025-08-01',
        totalAmount:800,
        currency:"USD",
        installments:8,
        ...scheduleOverrides,
    });

    return {schedule, loanId};
}
import { v4 as uuidv4 } from 'uuid';

export function generateLoanId() {
  return 'LN-' + uuidv4().split('-')[0].toUpperCase();
}

// commissions.model.ts
export interface Commissions {
  payable: number;   // Corresponds to the Payable field from backend (total debit)
  paid: number;      // Corresponds to the Paid field from backend (total credit)
  netValue: number;  // Cosure this matches the backend response type
  }
  
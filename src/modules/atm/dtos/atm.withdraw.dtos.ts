export interface IATMWithdrawInput {
  amount: number;
}

export interface IBankNote {
  value: number;
  quantity: number;
}

export interface IATMWithdrawOutput {
  balance: number;
  bankNotes: IBankNote[];
}

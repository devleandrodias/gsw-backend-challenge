export interface IATMWithdrawInput {
  value: number;
}

export interface IBankNote {
  value: number;
  quantity: number;
}

export interface IATMWithdrawOutput {
  balance: number;
  bankNotes: IBankNote[];
}

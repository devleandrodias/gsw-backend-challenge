export interface IATMWithdrawInput {
  amount: number;
}

export interface IBankNote {
  value: number;
  quantity: number;
}

export interface IATMWithdrawOutput {
  bankNotes: IBankNote[];
}

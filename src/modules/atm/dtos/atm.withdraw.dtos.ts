export interface IATMWithdrawInput {
  amount: number;
}

export interface IATMWithdrawOutput {
  notes: {
    note: number;
    quantity: number;
  }[];
}

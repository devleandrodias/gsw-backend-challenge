export interface IATMWithdrawInput {
  amount: number;
}

export interface IBankNote {
  value: number;
  quantityAvailable: number;
}

export interface IATMWithdrawOutput {
  notes: {
    note: number;
    quantity: number;
  }[];
}

export interface IATMWithdrawInput {
  value: number;
}

export interface IATMWithdrawOutput {
  result: {
    banknoteValue: number;
    banknoteQuantity: number;
  }[];
}

export interface IExtractOutput {
  balance: number;
}

export interface IDepositOutput {
  balance: number;
}

export interface IWithdrawOutput {
  result: {
    banknoteValue: number;
    banknoteQuantity: number;
  }[];
}

export interface IATMRepository {
  extract(): Promise<IExtractOutput>;
  deposit(value: number): Promise<IDepositOutput>;
  withdraw(value: number): Promise<IWithdrawOutput>;
}

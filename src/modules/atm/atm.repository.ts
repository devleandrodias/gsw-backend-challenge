export interface IATMRepository {
  deposit(value: number): Promise<void>;
  withdraw(value: number): Promise<void>;
  extract(): Promise<{ balance: number }>;
}

export class ATMRepository implements IATMRepository {
  private balance: number;

  constructor() {
    this.balance = 10000;
  }

  async deposit(value: number): Promise<void> {
    this.balance += value;
  }

  async withdraw(value: number): Promise<void> {
    this.balance -= value;
  }

  async extract() {
    return { balance: this.balance };
  }
}

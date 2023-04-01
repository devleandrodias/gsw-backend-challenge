import { IATMRepository } from "../../repositories/IATMRepository";

export class ATMInMemoryRepository implements IATMRepository {
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

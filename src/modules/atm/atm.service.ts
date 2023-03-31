export class ATMService {
  private balance: number;

  constructor() {
    this.balance = 10000;
  }

  async deposit(value: number) {
    this.balance += value;
  }

  async withdraw(value: number): Promise<void> {
    if (this.balance < value) {
      throw new Error(
        "Nao é possível sacar um valor maior do que o diponivel em conta"
      );
    }

    this.balance += value;
  }

  async extract() {
    return {
      balance: this.balance,
    };
  }
}

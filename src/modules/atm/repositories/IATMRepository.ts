export interface IATMRepository {
  deposit(value: number): Promise<void>;
  withdraw(value: number): Promise<void>;
  extract(): Promise<{ balance: number }>;
}

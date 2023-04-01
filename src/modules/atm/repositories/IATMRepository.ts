export interface IATMRepository {
  getAvailableBankNotes(): Promise<number[]>;
}

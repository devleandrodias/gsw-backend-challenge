export interface ITransaction {
  id: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAWAL";
}

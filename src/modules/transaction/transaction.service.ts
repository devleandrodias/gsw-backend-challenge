import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

import { ITransaction } from "./entities/ITransaction";
import { AppError } from "../../shared/infra/http/erros/appError";
import { ETransactionType } from "../../shared/enuns/ETransactionType";
import { ITransactionRepository } from "./repositories/ITransactionRepository";

@injectable()
export class TransactionService {
  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository
  ) {}

  async createTransaction(
    type: ETransactionType,
    amount: number
  ): Promise<number> {
    if (amount <= 0) {
      throw new AppError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "Não é possível criar transações com valores negativos ou zero"
      );
    }

    const balance = await this.getBalance();

    if (type === ETransactionType.WITHDRAWAL) {
      if (amount > balance) {
        throw new AppError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          "Não foi possível efetuar o saque porque o valor solicitado é maior do que o valor disponível"
        );
      }
    }

    await this.repository.createTransaction(type, amount);

    return this.getBalance();
  }

  async getBalance(): Promise<number> {
    const transactions = await this.repository.getTransactions();

    let balance = 0;

    for (const transaction of transactions) {
      switch (transaction.type) {
        case ETransactionType.DEPOSIT:
          balance += transaction.amount;
          break;
        case ETransactionType.WITHDRAWAL:
          balance -= transaction.amount;
          break;
      }
    }

    return balance;
  }

  async getTransactions(): Promise<ITransaction[]> {
    return this.repository.getTransactions();
  }
}

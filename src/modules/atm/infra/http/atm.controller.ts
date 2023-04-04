import { container } from "tsyringe";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ATMService } from "../../atm.service";
import { ATMValidation } from "./atm.validation";
import { IATMDepositInput } from "../../dtos/atm.deposit.dtos";
import { IATMWithdrawInput } from "../../dtos/atm.withdraw.dtos";

export class ATMController {
  async deposit(req: Request, res: Response): Promise<void> {
    const { amount } = req.body;

    const request: IATMDepositInput = { amount };
    ATMValidation.validateDeposit(request);

    const atmService = container.resolve(ATMService);
    const response = await atmService.deposit(request);

    res.status(StatusCodes.OK).json(response);
  }

  async withdraw(req: Request, res: Response): Promise<void> {
    const { amount } = req.body;

    const request: IATMWithdrawInput = { amount };
    ATMValidation.validateWithdraw(request);

    const atmService = container.resolve(ATMService);
    const response = await atmService.withdraw(request);

    res.status(StatusCodes.OK).json(response);
  }

  async extract(_: Request, res: Response): Promise<void> {
    const atmService = container.resolve(ATMService);
    const response = await atmService.extract();

    res.status(StatusCodes.OK).json(response);
  }
}

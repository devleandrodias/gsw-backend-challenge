import { container } from "tsyringe";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ATMService } from "../../atm.service";

export class ATMController {
  async deposit(req: Request, res: Response): Promise<void> {
    const atmService = container.resolve(ATMService);
    await atmService.deposit(req.body.value);
    res.status(StatusCodes.OK).send();
  }

  async withdraw(req: Request, res: Response): Promise<void> {
    const atmService = container.resolve(ATMService);
    await atmService.withdraw(req.body.value);
    res.status(StatusCodes.OK).send();
  }

  async extract(_: Request, res: Response): Promise<void> {
    const atmService = container.resolve(ATMService);
    const balance = await atmService.extract();
    res.status(StatusCodes.OK).json(balance);
  }
}

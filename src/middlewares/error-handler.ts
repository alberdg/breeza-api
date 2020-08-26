import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
/**
 * Handles errors to make them consistant
 * @function
 * @param { Error } err Error
 * @param { Request } req Request
 * @param { Response } res Response
 * @param { NextFunction } next Next handler
 */
export const errorHandler = (err : Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode)
      .send({ errors: err.serializeErrors() });
  }
  const { message } = err;
  console.error(message);
  res.status(400)
    .send({ errors: [
      { message}
    ]});
}

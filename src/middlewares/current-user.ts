import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string,
  email: string
};

// Override global Express Request to include currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
};
/**
 * Middleware function to verify token and store current user
 * @function
 * @param { Request } req Express request
 * @param { Response } res Express response
 * @param { Function } next Next middleware
 */
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
  }
  next();
}

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-requests';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import { JWT } from '../services/jwt';

const router = express.Router();

router.post('/users/login', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
],
validateRequest, async (req: Request, res: Response) => {
  console.log('Sign in')
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }
  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }
  JWT.sign(req, existingUser);
  res.status(200).send(User.transform(existingUser))
});

export { router as  signinRouter };

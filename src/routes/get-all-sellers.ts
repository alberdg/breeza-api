import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { User } from '../models/user';

const router = express.Router();
//FIXME: REST uris are preferred not have capital letters, to be consistant with
// your requirements I will provide it with capitals
router.get('/users/getAllSellers',
  // currentUser,
  // requireAuth,
  async (req: Request, res: Response) => {
  console.log('Sign in')
  const users = await User.find({ typeOfUser: '1' });
  res.status(200).send(users)
});

export { router as  getAllSellersRouter };

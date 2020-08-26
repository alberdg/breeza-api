import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { User } from '../models/user';
const SELLER_TYPE_OF_USER = '1';

const router = express.Router();
//FIXME: REST uris are preferred not have capital letters, to be consistant with
// your requirements I will provide it with capitals
router.get('/users/getAllSellers',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
  const users = await User.find({ typeOfUser: SELLER_TYPE_OF_USER });
  res.status(200).send(users)
});

export { router as  getAllSellersRouter };

import express, { Request, Response } from 'express';
import { query, body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-requests';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Review } from '../models/review';

const router = express.Router();
//FIXME: REST uris are preferred not have capital letters, to be consistant with
// your requirements I will provide it with capitals
router.post('/review',
  [
    query('sellerId')
      .trim()
      .notEmpty(),
    body('reviewValue')
      .isInt(),
    body('comment')
      .notEmpty()
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
  const user = req.session?.user;
  const { sellerId } = req.params;
  const { reviewValue, comment } = req.body;
  const review = await (new Review({ reviewValue, comment, user, sellerId })).save();
  res.status(200).send(review);
});

export { router as  postReviewRouter };

import express, { Request, Response } from 'express';
import { query, body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-requests';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Review } from '../models/review';

const router = express.Router();

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
  const { sellerId } = req.query;
  const { reviewValue, comment } = req.body;
  const review = await (new Review({ reviewValue, comment, sellerId })).save();
  res.status(200).send(review);
});

export { router as  postReviewRouter };

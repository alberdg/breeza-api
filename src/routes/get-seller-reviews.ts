import express, { Request, Response } from 'express';
import { query } from 'express-validator';
import { validateRequest } from '../middlewares/validate-requests';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Review } from '../models/review';

const router = express.Router();
//FIXME: REST uris are preferred not have capital letters, to be consistant with
// your requirements I will provide it with capitals

router.get('/getSellerReviews',
  [
    query('sellerId')
      .trim()
      .notEmpty(),
  ],
  validateRequest,
  // Not sure if user must be authenticated for this but I provide it just in case
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
  const { sellerId } = req.query;
  const reviews = await Review.find({ sellerId });
  res.status(200).send(reviews);
});

export { router as  getSellerReviewsRouter };

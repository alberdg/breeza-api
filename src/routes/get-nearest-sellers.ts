import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { User } from '../models/user';
const SELLER_TYPE_OF_USER = '1';

const router = express.Router();
//FIXME: REST uris are preferred not have capital letters, to be consistant with
// your requirements I will provide it with capitals
router.get('/getNearestSellers',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
  const { maxDistance, latitude, longitude } = req.query;

  const sellers: any = await User.find({
    typeOfUser: SELLER_TYPE_OF_USER,
    location: {
     $near: {
      $maxDistance:  maxDistance,
      $geometry: {
       type: "Point",
       coordinates: [ longitude, latitude ]
      }
     }
    }
  });

  res.status(200).send(User.transformMany(sellers));
});

export { router as  getNearestSellersRouter };

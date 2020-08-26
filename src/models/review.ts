import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface ReviewDoc extends mongoose.Document {
  reviewValue: number,
  comment: string,
  sellerId:  any,
  user: any,
};

const reviewSchema = new mongoose.Schema({
  reviewValue: Number,
  comment: String,
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});


const Review = mongoose.model<ReviewDoc, any>('review', reviewSchema);

export { Review };

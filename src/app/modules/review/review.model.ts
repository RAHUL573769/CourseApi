import { Schema, model } from 'mongoose';
import { IReview, IReviewModel } from './review.interface';

export const reviewSchema = new Schema<IReview, IReviewModel>({
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: { type: Schema.ObjectId, required: true, ref: 'User' },
});

reviewSchema.statics.isReviewExists = async function (id) {
  const existingReview = await this.findById(id);
  return existingReview ? true : false;
};

export const Review = model<IReview, IReviewModel>('Review', reviewSchema);

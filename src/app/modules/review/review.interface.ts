import { Model, Types } from 'mongoose';

export interface IReview {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
  createdBy: Types.ObjectId;
}

export interface IReviewModel extends Model<IReview> {
  // eslint-disable-next-line no-unused-vars
  isReviewExists(id: Types.ObjectId): boolean;
}

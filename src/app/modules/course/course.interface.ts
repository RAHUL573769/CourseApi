import { Model, Types } from 'mongoose';
import { IReview } from '../review/review.interface';

export interface ITag {
  name: string;
  isDeleted: boolean;
}
export interface IDetails {
  level: string;
  description: string;
}

export interface ICourse {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: ITag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: IDetails;
  createdBy: Types.ObjectId;
}
export interface ICourseWithReviews {
  course: ICourse | null;
  reviews: IReview[];
}

export interface IBestCourse {
  course: ICourse | null;
  averageRating: number;
  reviewCount: number;
}

export interface ICourseModel extends Model<ICourse> {
  // eslint-disable-next-line no-unused-vars
  isCourseExists(id: Types.ObjectId): boolean;
}

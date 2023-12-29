import { Model, Types } from 'mongoose';

export type TCategory = {
  name: string;
  createdBy: Types.ObjectId;
};

export interface ICategoryModel extends Model<TCategory> {
  // eslint-disable-next-line no-unused-vars
  isCategoryExists(id: Types.ObjectId): boolean;
}

import { Query } from 'mongoose';
import { TQueryObj } from '../interface/TMeta';

export const paginate = <T>(queryModel: Query<T[], T>, query: TQueryObj) => {
  if (query.page || query.limit) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    queryModel.skip(skip).limit(limit);
  } else {
    queryModel.skip(0).limit(10);
  }
  return queryModel;
};

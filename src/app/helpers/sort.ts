import { Query } from 'mongoose';
import { TQueryObj } from '../interface/TMeta';

export const sort = <T>(queryModel: Query<T[], T>, query: TQueryObj) => {
  if (query.sortBy && query.sortOrder) {
    // Course.find().sort('name')
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder; // asc| desc
    const sortStr = `${sortOrder === 'dsc' ? '-' : ''}${sortBy}`;
    console.log(sortStr, 'sort by query');

    queryModel.sort(sortStr);
  }
  return queryModel;
};

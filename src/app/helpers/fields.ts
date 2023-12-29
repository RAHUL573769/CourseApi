import { Query } from 'mongoose';
import { TQueryObj } from '../interface/TMeta';

export const select = <T>(queryModel: Query<T[], T>, query: TQueryObj) => {
  if (query.fields) {
    const fields = query.fields.split(',').join(' ');
    queryModel.select(fields);
  }

  return queryModel;
};

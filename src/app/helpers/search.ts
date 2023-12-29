import { FilterQuery, Query } from 'mongoose';
import { TQueryObj } from '../interface/TMeta';

export const search = <T>(queryModel: Query<T[], T>, query: TQueryObj) => {
  if (query?.searchTerm) {
    const fieldsValue = Object.values(queryModel.model.schema.paths);
    const searchableFields = fieldsValue
      .filter((fildObj) => {
        if (queryModel.model.schema.path(fildObj.path).instance === 'String') {
          return true;
        }
      })
      .map(
        (fildObj) =>
          ({
            [fildObj.path]: { $regex: query.searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      );
    console.log(searchableFields, 'SSSS');

    queryModel.find({ $or: searchableFields });
  }
  return queryModel;
};

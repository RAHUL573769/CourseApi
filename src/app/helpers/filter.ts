import { Query } from 'mongoose';
import { TQueryObj } from '../interface/TMeta';

export const filter = <T>(queryModel: Query<T[], T>, query: TQueryObj) => {
  //take a copy of the query
  const queryObject = { ...query };
  console.log(queryObject);

  const excludeFields = [
    'page',
    'searchTerm',
    'limit',
    'sortBy',
    'sortOrder',
    'fields',
    'minPrice',
    'maxPrice',
  ];
  excludeFields.forEach((keyword) => delete queryObject[keyword]);
  // Handle tags array
  if (queryObject.tags) {
    queryObject['tags.name'] = { $in: queryObject.tags };
    delete queryObject.tags;
  }

  queryModel = queryModel.find(queryObject);
  return queryModel;
};

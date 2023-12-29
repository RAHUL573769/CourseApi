import { Query } from 'mongoose';
import { TQueryObj } from '../interface/TMeta';

export const countTotal = async <T>(queryModel: Query<T[], T>, query: TQueryObj) => {
  const totalQueries = queryModel.getFilter();
  const total = await queryModel.model.countDocuments(totalQueries);
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  // const totalPage = Math.ceil(total / limit);
  // Execute the query to get the result
  const courses = await queryModel;

  // Create an object containing both the result and metadata
  const response = {
    meta: {
      page,
      limit,
      total,
    },
    courses,
  };

  return response;
};

import { Query } from 'mongoose';
import { TQueryObj } from '../interface/TMeta';
import { filter } from './filter';
import { search } from './search';
import { sort } from './sort';
import { paginate } from './paginate';
import { select } from './fields';
import { countTotal } from './countTotal';

export const getQuery = <T>(queryModel: Query<T[], T>, query: TQueryObj) => {
  const filtredQuey = filter(queryModel, query);
  const searchQuery = search(filtredQuey, query);
  const sortQuery = sort(searchQuery, query);
  const paginateQuery = paginate(sortQuery, query);
  const fieldsQuery = select(paginateQuery, query);
  const countQuery = countTotal(fieldsQuery, query);

  return countQuery;
};

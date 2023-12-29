import { User } from './user.model';

const getUsers = async () => {
  const users = await User.find({});
  return users;
};

export const UserServices = {
  getUsers,
};

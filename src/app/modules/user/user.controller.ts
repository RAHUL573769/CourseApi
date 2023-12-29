import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getUsers();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User fetched successfully',
    data: users,
  });
});

export const UserControllers = {
  getUsers,
};

import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

// create user
const registerUser = catchAsync(async (req, res) => {
  const payload = await req.body;
  // call user service
  const user = await AuthServices.registerUser(payload);
  // send response
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: user,
  });
});

// login user controller
const login = catchAsync(async (req, res) => {
  const user = await AuthServices.login(req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: {
      user: user.user,
      token: user.token,
    },
  });
});

//change password
const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Password changed successfully',
    data: result,
  });
});
export const AuthControllers = {
  registerUser,
  login,
  changePassword,
};

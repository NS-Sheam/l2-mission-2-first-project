import { Request, Response } from 'express';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import config from '../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password updated successfully',
    data: result,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token updated successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;
  const result = await AuthServices.forgetpassword(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reset link is generated successfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPassword(req.body, token as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pasword reset successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};

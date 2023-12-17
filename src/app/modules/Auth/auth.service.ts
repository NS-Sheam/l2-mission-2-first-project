import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  //   checking if the user is exist in the database

  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already deleted');
  }

  const userStatus = user?.status;

  //   checking if the user is already blocked
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }
  //  checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  // create token and sent to the client
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  user: { userId: string; role: string },
  payload,
) => {
  const result = await User.findOneAndUpdate({
    id: user.userId,
    role: user.role,
  });
};

export const AuthServices = {
  loginUser,
  changePassword,
};

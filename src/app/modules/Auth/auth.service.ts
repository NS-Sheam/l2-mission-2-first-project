import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

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
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiration as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiration as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  //   checking if the user is exist in the database

  const user = await User.isUserExistsByCustomId(userData?.userId);

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
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  // hash the new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // verify the token

  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded as JwtPayload;

  //   checking if the user is exist in the database

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  }

  const userStatus = user?.status;

  //   checking if the user is already blocked
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  if (
    user?.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Password changed after the token issued',
    );
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  // create token and sent to the client
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiration as string,
  );

  return {
    accessToken,
  };
};

const forgetpassword = async (userId: string) => {
  //   checking if the user is exist in the database
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  }

  const userStatus = user?.status;

  //   checking if the user is already blocked
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  // create token and sent to the client
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_password_ui_link}?id=${user?.id}&token=${resetToken}`;
  console.log(resetUILink);

  sendEmail(user.email, resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  //   checking if the user is exist in the database
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  }

  const userStatus = user?.status;

  //   checking if the user is already blocked
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  const decoded = verifyToken(token, config.jwt_access_secret as string);

  if (decoded.userId !== payload.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }

  // hash the new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetpassword,
  resetPassword,
};

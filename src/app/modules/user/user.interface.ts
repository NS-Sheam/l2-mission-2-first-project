import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched: (
    plainTextPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    paswordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;

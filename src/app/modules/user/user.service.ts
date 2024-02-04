/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};
  // if password not given use default password
  userData.password = password || config.default_password;

  // set user role
  userData.role = 'student';
  // set student email
  userData.email = payload.email;
  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admission semester not found');
  }

  //find department
  const academinDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academinDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic Department not found');
  }

  payload.academicFaculty = academinDepartment.academicFaculty;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester!);

    if (file) {
      const imageName = `${userData.id}-${payload?.name?.firstName}-${payload?.name?.lastName}`;
      const path = file?.path;

      // send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }
    // create a user (Transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student (Transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  // set faculty role
  userData.role = 'faculty';
  // set faculty email
  userData.email = payload.email;
  userData.id = await generateFacultyId();

  if (file) {
    const imageName = `${userData.id}-${payload?.name?.firstName}-${payload?.name?.lastName}`;
    const path = file?.path;
    // send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.profileImg = secure_url as string;
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Transaction 1
    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Transaction 2
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  // set admin role
  userData.role = 'admin';
  // set admin email
  userData.email = payload.email;
  userData.id = await generateAdminId();

  if (file) {
    const imageName = `${userData.id}-${payload?.name?.firstName}-${payload?.name?.lastName}`;
    const path = file?.path;
    // send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.profileImg = secure_url as string;
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Transaction-1
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // Transaction-2
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
  }
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  } else if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  } else if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};

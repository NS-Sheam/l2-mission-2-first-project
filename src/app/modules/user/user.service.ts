import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  const userData: Partial<TUser> = {};
  // if password not given use default password
  userData.password = password || config.default_password;

  // set user role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester!);

    // create a user (Transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id;

    // create a student (Transaction-2)
    const newStudent = await Student.create([payLoad], { session });
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

const createFacultyIntoDB = async (password: string, payLoad: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.role = 'faculty';

  userData.id = await generateFacultyId();

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Transaction 1
    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id;

    // Transaction 2
    const newFaculty = await Faculty.create([payLoad], { session });

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

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};

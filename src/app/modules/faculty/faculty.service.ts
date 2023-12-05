import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { User } from '../user/user.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery.populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id }).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remaining } = payload;
  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name))
      modifiedObject[`name.${key}`] = value;
  }
  const result = await Faculty.findOneAndUpdate({ id }, modifiedObject, {
    new: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Transaction 1
    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { session },
    );
    if (!deletedFaculty) {
      throw new Error('Failed to delete faculty');
    }

    // Transaction 2
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { session },
    );
    if (!deletedUser) {
      throw new Error('Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete faculty');
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};

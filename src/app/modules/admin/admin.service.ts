import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Admin } from './admin.model';
import { TAdmin } from './admin.interface';
import { User } from '../user/user.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await adminQuery.modelQuery;

  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);

  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remaining } = payload;
  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name))
      modifiedObject[`name.${key}`] = value;
  }
  const result = await Admin.findByIdAndUpdate(id, modifiedObject, {
    new: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Transaction 1
    const deletedAdmin = await Admin.findById(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new Error('Failed to delete admin');
    }

    const userId = deletedAdmin.user;

    // Transaction 2
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new Error('Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete admin');
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};

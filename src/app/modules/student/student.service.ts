import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  // const result = await Student.aggregate([{ $match: {} }]);
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  // const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDb,
};

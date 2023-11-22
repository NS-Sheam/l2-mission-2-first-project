import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User already exist');
  }
  const result = await Student.create(studentData);

  // const student = new Student(studentData); //create an instance of model
  // if (await student.isUserExist(student.id)) {
  //   throw new Error('User already exist');
  // }
  // const result = await student.save();
  return result;
};

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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDb,
};

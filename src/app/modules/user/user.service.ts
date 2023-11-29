import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // if (await Student.isUserExist(studentData.id)) {
  //   throw new Error('User already exist');
  // }
  const userData: Partial<TUser> = {};
  // if password not given use default password
  userData.password = password || config.default_password;

  // set user role
  userData.role = 'student';

  const generateStudentId = (payload: TAcademicSemester) => {};

  // manual id
  userData.id = generateStudentId(studentData.admissionSemester);

  // create an user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
  }

  const newStudent = await Student.create(studentData);

  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};

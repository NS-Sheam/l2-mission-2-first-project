import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

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

  userData.id = await generateStudentId(admissionSemester!);

  // create a user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payLoad.id = newUser.id;
    payLoad.user = newUser._id;
  }

  const newStudent = await Student.create(payLoad);

  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};

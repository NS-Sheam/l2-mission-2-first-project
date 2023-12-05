import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
    { sort: { createdAt: -1 } },
  ).lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// year semestercode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

export const generateFacultyId = async () => {
  const lastFaculty = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 },
    { sort: { createdAt: -1 } },
  );

  const lastFacultyId = lastFaculty?.id || undefined;
  const currentId = lastFacultyId?.substring(2) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  const facultyId = `F-${incrementId}`;

  return facultyId;
};
export const generateAdminId = async () => {
  const lastAdmin = await User.findOne(
    { role: 'admin' },
    { id: 1, _id: 0 },
    { sort: { createdAt: -1 } },
  );

  const lastAdminId = lastAdmin?.id || undefined;
  const currentId = lastAdminId?.substring(2) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  const AdminId = `A-${incrementId}`;

  return AdminId;
};

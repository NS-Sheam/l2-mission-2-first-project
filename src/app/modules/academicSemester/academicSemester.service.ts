import { academicSemesterNamCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNamCodeMapper[payload.name] !== payload.code) {
    throw new Error('Semester name and code does not match');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
  return result;
};

const updateAcademicSemesterFromDB = async (
  semesterId: string,
  payload: TAcademicSemester,
) => {
  const result = await AcademicSemester.findByIdAndUpdate(semesterId, payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};

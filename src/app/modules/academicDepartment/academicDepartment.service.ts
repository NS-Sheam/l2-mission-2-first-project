import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await academicDepartmentQuery.countTotal();
  const result = await academicDepartmentQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};

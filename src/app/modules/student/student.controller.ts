import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB();
  res.status(200).json({
    status: true,
    message: 'Students retrived successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);
  res.status(200).json({
    status: true,
    message: 'Student retrived successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDb(studentId);
  res.status(200).json({
    status: true,
    message: 'Student deleted successfully',
    data: result,
  });
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};

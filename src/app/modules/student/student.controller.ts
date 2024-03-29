import { Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB(req.query);
  res.status(200).json({
    status: true,
    message: 'Students retrived successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.getSingleStudentFromDB(id);
  res.status(200).json({
    status: true,
    message: 'Student retrived successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { student } = req.body;

    const result = await studentServices.updateStudentInDB(id, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is updated succesfully',
      data: result,
    });
  },
);

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.deleteStudentFromDb(id);
  res.status(200).json({
    status: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

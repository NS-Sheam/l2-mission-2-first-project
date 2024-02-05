import { Request, Response } from 'express';
import { AcademicDepartmentServices } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);

const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB(
        req.query,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Departments fetched successfully',
      meta: result.meta,
      data: result.result,
    });
  },
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
        departmentId,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Academic Department fetched successfully',
      data: result,
    });
  },
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  },
);

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};

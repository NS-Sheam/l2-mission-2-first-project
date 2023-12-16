import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OfferedCourseServices } from './offeredCourse.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course created successfully',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Offered Courses fetched successfully',
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { offeredCourseId } = req.params;
    const result =
      await OfferedCourseServices.getSingleOfferedCourseFromDB(offeredCourseId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Offered Course fetched successfully',
      data: result,
    });
  },
);

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course updated successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
};

import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Courses fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Course fetched successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});
const assignFacultiesWithCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course updated successfully',
      data: result,
    });
  },
);
const getFacultiesWithCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const result = await CourseServices.getFacultiesWithCourseIntoDB(courseId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties retrieve successfully',
      data: result,
    });
  },
);

const removeFacultiesFromCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
      courseId,
      faculties,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties removed successfully',
      data: result,
    });
  },
);

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  getFacultiesWithCourse,
  removeFacultiesFromCourse,
};

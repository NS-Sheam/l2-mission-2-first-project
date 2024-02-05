import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';
import catchAsync from '../../utils/catchAsync';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EnrolledCourse created successfully',
    data: result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;
  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My EnrolledCourses fetched successfully',
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const { userId: facultyId } = req.user;

  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EnrolledCourse marks updated successfully',
    data: result,
  });
});
const getEnrolledCourses = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getEnrolledCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EnrolledCourses data fetch successfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getMyEnrolledCourses,
  getEnrolledCourses,
};

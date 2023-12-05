import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidation } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidation.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

export const UserRoutes = router;

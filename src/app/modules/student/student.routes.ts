import express from 'express';
import { StudentControllers } from './student.controller';
import { studentValidation } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:studentId', StudentControllers.getSingleStudent);
router.get('/', StudentControllers.getAllStudents);

router.patch(
  '/:studentId',
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;

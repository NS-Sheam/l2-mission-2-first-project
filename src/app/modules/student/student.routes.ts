import express from 'express';
import { StudentControllers } from './student.controller';
import { studentValidation } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStudent);
router.get('/', StudentControllers.getAllStudents);

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;

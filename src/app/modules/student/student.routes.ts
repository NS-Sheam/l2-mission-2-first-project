import express from 'express';
import { StudentControllers } from './student.controller';
import { studentValidation } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);
router.get('/', StudentControllers.getAllStudents);

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;

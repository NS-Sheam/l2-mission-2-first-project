import { Router } from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.get(
  '/',
  auth(USER_ROLE.admin),
  AcademicFacultyControllers.getAllAcademicFaculties,
);

export const AcademicFacultyRoutes = router;

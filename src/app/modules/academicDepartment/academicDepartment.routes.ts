import { Router } from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from '../academicFaculty/academicFaculty.validation';

const router = Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;

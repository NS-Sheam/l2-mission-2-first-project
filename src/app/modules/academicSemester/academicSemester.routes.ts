import { Router } from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAcademicSemester);
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;

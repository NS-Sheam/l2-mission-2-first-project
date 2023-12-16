import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  validateRequest(
    semesterValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

export const SemesterRegistrationRoutes = router;

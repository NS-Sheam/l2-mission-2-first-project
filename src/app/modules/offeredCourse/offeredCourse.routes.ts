import { Router } from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = Router();

router.get('/', OfferedCourseController.getAllOfferedCourses);
router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

export const offeredCourseRoutes = router;

import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidationSchema } from './course.validation';

const router = Router();

router.post(
  '/create-course',
  validateRequest(CourseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/:id', CourseControllers.getSingleCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidationSchema.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.get('/', CourseControllers.getAllCourses);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidationSchema.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidationSchema.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);
router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;

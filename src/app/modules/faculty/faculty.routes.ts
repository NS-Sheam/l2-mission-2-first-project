import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from './faculty.validation';

const router = Router();

router.get('/:facultyId', FacultyControllers.getSingleFaculty);
router.get('/', FacultyControllers.getAllFaculties);
router.patch(
  '/:facultyId',
  validateRequest(facultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:facultyId', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;

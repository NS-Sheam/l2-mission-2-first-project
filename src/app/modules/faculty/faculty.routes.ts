import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/:id', FacultyControllers.getSingleFaculty);
router.get('/', auth(), FacultyControllers.getAllFaculties);
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;

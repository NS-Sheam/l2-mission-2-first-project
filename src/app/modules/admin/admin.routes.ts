import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidation } from './admin.validation';

const router = Router();

router.get('/:adminId', AdminControllers.getSingleAdmin);
router.get('/', AdminControllers.getAllAdmins);
router.patch(
  '/:adminId',
  validateRequest(adminValidation.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;

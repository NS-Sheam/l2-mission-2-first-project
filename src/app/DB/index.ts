import config from '../config';
import { USER_ROLE } from '../modules/user/user.const';
import { User } from '../modules/user/user.model';

const superAdmin = {
  id: '0001',
  email: '123sheamfeni@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};
const seedSuperAdmin = async () => {
  // when database is connected, we will check is thee any user who super admin
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;

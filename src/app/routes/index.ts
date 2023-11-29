import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

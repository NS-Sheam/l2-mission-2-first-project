import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      {
        message: 'First name must be in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z.string().max(20),
});
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      designation: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      {
        message: 'First name must be in capitalize format',
      },
    )
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().max(20).optional(),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      academicDepartment: z.string().optional(),
      academicFaculty: z.string().optional(),
      designation: z.string().optional(),
      profileImg: z.string().optional().optional(),
    }),
  }),
});

export const facultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};

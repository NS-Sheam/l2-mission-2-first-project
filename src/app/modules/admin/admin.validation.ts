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
const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      managementDepartment: z.string(),
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

const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'others']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      managementDepartment: z.string().optional(),
      designation: z.string().optional(),
      profileImg: z.string().optional().optional(),
    }),
  }),
});

export const adminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};

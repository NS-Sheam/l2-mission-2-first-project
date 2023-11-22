import Joi from 'joi';

const userValidationSchema = Joi.object({
  firstName: Joi.string().trim().required().max(20).messages({
    'string.max': 'First name cannot exceed {#limit} characters',
    'any.required': 'First name is required',
  }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.pattern.base': 'Last name must contain only letters',
      'any.required': 'Last name is required',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'any.required': "Father's name is required",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'any.required': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'any.required': "Father's contact number is required",
  }),
  motherName: Joi.string().trim().required().messages({
    'any.required': "Mother's name is required",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'any.required': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'any.required': "Mother's contact number is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': "Local guardian's name is required",
  }),
  occupation: Joi.string().trim().required().messages({
    'any.required': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    'any.required': "Local guardian's contact number is required",
  }),
  address: Joi.string().trim().required().messages({
    'any.required': "Local guardian's address is required",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'any.required': 'Student ID is required',
  }),
  name: userValidationSchema,
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'any.required': 'Gender is required',
    'any.only': 'Gender must be one of [male, female, others]',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().trim().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  contactNo: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({
      'any.required': 'Blood group is required',
      'any.only':
        'Blood group must be one of [A+, A-, B+, B-, AB+, AB-, O+, O-]',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'any.required': 'Present address is required',
  }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: Joi.string(),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .required()
    .messages({
      'any.required': 'Status (active/blocked) is required',
      'any.only': 'Status must be one of [active, blocked]',
    }),
});

export default studentValidationSchema;

import { z } from 'zod';
import { Days } from './offeredCourse.const';

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(
        (time) => {
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: 'Invalid time format expected "HH:MM" in 24 hour format',
        },
      ), // HH:MM format (24 hour) 00-23:00-59
      endTime: z.string().refine(
        (time) => {
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: 'Invalid time format expected HH:MM in 24 hour format',
        },
      ), // HH:MM format (24 hour) 00-23:00-59,
    })
    .refine(
      (body) => {
        //startTime : 10:30 => 1970-01-01T10:30
        //startTime : 10:30 => 1970-01-01T12:30
        const { startTime, endTime } = body;
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        return start < end;
      },
      {
        message: 'Invalid time range. Start time must be less than end time',
      },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};

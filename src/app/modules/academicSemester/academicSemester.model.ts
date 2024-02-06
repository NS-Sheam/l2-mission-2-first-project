import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: [true, 'Semester name is required'],
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: [true, 'Semester code is required'],
    },
    year: {
      type: String,
      required: [true, 'Semester year is required'],
    },
    startMonth: {
      type: String,
      required: [true, 'Semester end month is required'],
      enum: Months,
    },
    endMonth: {
      type: String,
      required: [true, 'Semester start month is required'],
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Semester already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

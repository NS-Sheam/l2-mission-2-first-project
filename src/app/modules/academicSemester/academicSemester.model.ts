import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      enum: AcademicSemesterName,
      type: String,
      required: [true, 'Semester name is required'],
    },
    code: {
      enum: AcademicSemesterCode,
      type: String,
      required: [true, 'Semester code is required'],
    },
    year: {
      type: String,
      required: [true, 'Semester year is required'],
    },
    startMonth: {
      enum: Months,
      type: String,
      required: [true, 'Semester end month is required'],
    },
    endMonth: {
      enum: Months,
      type: String,
      required: [true, 'Semester start month is required'],
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
    throw new Error('Semester already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

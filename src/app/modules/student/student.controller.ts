import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // // data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using zod
    const zodData = studentValidationSchema.parse(studentData);

    // sending validated data insthead of studentData
    const result = await studentServices.createStudentIntoDB(zodData);

    // if (error) {
    //   res.status(500).json({
    //     status: false,
    //     message: 'Something went wrong.',
    //     error: error.details[0],
    //   });
    // }
    res.status(200).json({
      status: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'Something went wrong.',
      error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      status: true,
      message: 'Students retrived successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || 'Something went wrong.',
      error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      status: true,
      message: 'Student retrived successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'Something went wrong.',
      error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDb(studentId);
    res.status(200).json({
      status: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'Something went wrong.',
      error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};

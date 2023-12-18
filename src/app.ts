import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Student Management System',
  });
});

// error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;

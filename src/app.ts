import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './app/routes';
import { golablErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();

//parse
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, message: 'Welcome to Rahul Course Authentication Api' });
  } catch (error) {
    next(error);
  }
});

//user routes
app.use('/api', router);
//not found
app.use(notFound);
// global error handler
app.use(golablErrorHandler);

export default app;

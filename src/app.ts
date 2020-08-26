import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from './middlewares/error-handler';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';

const app = express();
app.use(json());
app.use(signupRouter);
app.use(signinRouter);
app.use(errorHandler);

export default app;

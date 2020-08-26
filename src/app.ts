import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/error-handler';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { getAllSellersRouter } from './routes/get-all-sellers';
import { postReviewRouter  } from './routes/post-review';

const app = express();
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: false,
}));

app.use(signupRouter);
app.use(signinRouter);
app.use(getAllSellersRouter);
app.use(errorHandler);
app.use(postReviewRouter);
export default app;

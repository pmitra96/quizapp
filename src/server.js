import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from '../src/routes/user';
import quizRouter from './routes/quiz';
import quizSessionRouter from './routes/quizSession';
import {initialize} from '../src/middleware/auth';

// enables us to use environment variables.
dotenv.config();

const PORT = process.env.PORT;

const app = express();

// connect to mongo db
mongoose.connect(process.env.DATABASE_URL,
    {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
  }
});

mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB database.');
});

// using to ensure security, to know more about the functionality
// visit https://www.npmjs.com/package/helmet#how-it-works.
app.use(helmet());

app.use(cors());

// for now we are setting the cors to allow requests from all origins
// we can configure it to be disallowed when
// the app runs in production and we know the domain name
app.use(cors({
  origin: '*',
}));

// Middleware to reas the body of incomming requests.
// used to read the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(initialize());

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/quizzes', quizRouter);
app.use('/api/v1/quizSessions', quizSessionRouter);
app.use('api/v1/', (_req, res, _next) => {
  res.json({message: 'welcome to quiz app, please login to continue'});
});


app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});

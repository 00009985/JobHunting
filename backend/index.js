import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import reviewRoute from './routes/review.route.js';
import messageRoute from './routes/message.route.js';
import jobRoute from './routes/job.route.js';
import resumeRoute from './routes/resume.route.js';
import conversationRoute from './routes/conversation.route.js';
import applicationRoute from './routes/application.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOCONNECTION);
    console.log('Connected to monog db');
  } catch (error) {
    handleError(error);
  }
};


//middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/messages', messageRoute);
app.use('/api/jobs', jobRoute);
app.use('/api/resumes', resumeRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/applications', applicationRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  return res.status(errorStatus).send(errorMessage);
});

app.listen(5000, () => {
  connect();
  console.log('Backend running');
});

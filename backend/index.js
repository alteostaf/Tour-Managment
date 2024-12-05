import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tour.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/review.js';
import bookingRoute from './routes/booking.js';



dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin:true,
  credentials:true,
}

mongoose.set('strictQuery', false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB database connected');
  } catch (error) {
    console.log('Database connection failed:', error.message);
  }
};

// Middleware setup
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);



// Start the server and connect to the database
app.listen(port, () => {
  connect();
  console.log('Server listening on port', port);
});


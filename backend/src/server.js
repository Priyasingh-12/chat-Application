
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/authRoute.js';
import messageRoutes from './routes/messageRoute.js';
import cookieParser from 'cookie-parser' ;
import cors from  'cors' ;

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cookieParser()) ;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true ,
}))
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/message',messageRoutes);


app.listen(PORT, async () => {
    try {
      await connectDB(); // Ensure database connection
      console.log(`Server is running on PORT ${PORT}`);
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  });
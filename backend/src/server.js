
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/authRoute.js';
import messageRoutes from './routes/messageRoute.js';
import cookieParser from 'cookie-parser' ;


dotenv.config();

const app = express();
app.use(cookieParser()) ;
const PORT = process.env.PORT;

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/message',messageRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
    connectDB() ;
});


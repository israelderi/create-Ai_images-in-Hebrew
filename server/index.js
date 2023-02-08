import express from "express";
import connectDB from './MongoDB/connect.js';
import cors from 'cors';
import dotenv from "dotenv";
import postRoute from './routes/postRoute.js';
import dalleRoute from './routes/dalleRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '80mb'}));

app.use('/api/post', postRoute);
app.use('/api/dalle', dalleRoute);

const serverAndDB = async () => {
   try {
    connectDB(process.env.MONGO_DB);
    app.listen(process.env.PORT, ()=> console.log('server run! and DB connect'));
   } catch (error) {
    console.log(error);
   } 
};

serverAndDB();
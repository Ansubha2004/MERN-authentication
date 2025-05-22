import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './models/config.js';
import Authrouter from './routes/Authrouter.js';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());





app.get('/test',(req,res)=>{
    res.send('Hello World');
})


app.use('/auth',Authrouter);



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
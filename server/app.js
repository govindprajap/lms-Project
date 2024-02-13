import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import errorMidelware from './midleware/error.midleware.js';
import userRoutes from './route/user.route.js'
import courseRoutes from './route/course.route.js'




config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({}));
app.use(cookieParser());
app.use(morgan('dev'))
app.use('/ping',(req,res)=>{
    res.send('/pong')
})
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses',courseRoutes);




  
// three route  module
app.use('*',(req,res)=>{
    res.status(400).send('OOPS! 404 page not found')
})
app.use(errorMidelware)

export default app;
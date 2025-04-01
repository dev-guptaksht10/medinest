import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 4444;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(bodyParser.json({limit: "4kb"}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

import userRoute from './routes/user.route.js';
app.use('/api/users', userRoute);

import doctRoute from './routes/doctor.route.js';
app.use('/api/doctors', doctRoute);


mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log('http://localhost:' + PORT);
        })
    }).catch((error)=>{
        console.log('Error connecting to MongoDB:', error);
    })



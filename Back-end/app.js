import dotenv from 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './routes/auth.js';
import './database.js';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
app.use("/auth", authRouter);


// servidor e porta
const port = process.env.PORT || 3001;
app.listen(port, () =>
    console.log('O servidor está rodando no endereço http://localhost:' + port)
);

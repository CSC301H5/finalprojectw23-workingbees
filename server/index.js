import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import testRoutes from './routes/test.js';
import apiV1routes from './routes/apiV1.js';

const app = express();

app.use('/test', testRoutes);
app.use('/api/v1', apiV1routes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL
const PORT = process.env.PORT || 3030;

mongoose.set('strictQuery', false); // supress warnings

mongoose.connect(MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Running on p${PORT}`)))
    .catch((err) => console.log(err.message));



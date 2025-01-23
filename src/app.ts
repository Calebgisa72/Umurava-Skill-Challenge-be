import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
import { dbConnect } from './config/db.config';
import logger from './utils/logger';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes to handle All request
app.use(router);

// Error Handeling Middleware
app.use(errorHandler);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await dbConnect();
  logger.info(`Server is running on http://localhost:${PORT}`);
});

export default app;

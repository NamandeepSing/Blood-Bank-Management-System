import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch(err => console.error("❌ DB Connection Failed", err));


// Routes
import donorRoutes from './routes/donorRoutes.js';
import bloodRoutes from './routes/bloodRoutes.js';
import componentRoutes from './routes/componentRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import testingRoutes from './routes/testingRoutes.js';
import satisfiedRoutes from './routes/satisfiedRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

app.use('/api/donor', donorRoutes);
app.use('/api/blood', bloodRoutes);
app.use('/api/component', componentRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/testing', testingRoutes);
app.use('/api/satisfied', satisfiedRoutes);
app.use('/api/analytics', analyticsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { pool };

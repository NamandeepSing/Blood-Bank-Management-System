// === satisfiedRoutes.js ===
import express from 'express';
import { pool } from '../server.js';
const router = express.Router();

// Get all satisfied requests
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM SATISFIED_REQUESTS`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
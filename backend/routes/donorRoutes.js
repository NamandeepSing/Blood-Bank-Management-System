import express from 'express';
import { pool } from '../server.js';
const router = express.Router();

// Add donor
router.post('/', async (req, res) => {
  const { name, blood_type, rh_factor, date_of_birth, contact_info } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Donor(name, blood_type, rh_factor, date_of_birth, contact_info)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, blood_type, rh_factor, date_of_birth, contact_info]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get donor by name + contact
router.get('/', async (req, res) => {
  const { name, contact_info } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM Donor WHERE name = $1 AND contact_info = $2`,
      [name, contact_info]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

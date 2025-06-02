// === requestRoutes.js ===
import express from 'express';
import { pool } from '../server.js';
const router = express.Router();

// Get all requests
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM REQUEST ORDER BY request_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert into REQUEST table
router.post('/', async (req, res) => {
  const { blood_type, component_type, patient_name, patient_age, request_date, hospital, contact_info } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO REQUEST(blood_type, component_type, patient_name, patient_age, request_date, hospital, contact_info)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING request_id`,
      [blood_type, component_type, patient_name, patient_age, request_date, hospital, contact_info]
    );
    res.json({ request_id: result.rows[0].request_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert into PATIENT_SAMPLE
router.post('/sample', async (req, res) => {
  const { patient_name, contact_info, collection_date } = req.body;
  try {
    const reqResult = await pool.query(
      `SELECT request_id FROM REQUEST WHERE patient_name = $1 AND contact_info = $2`,
      [patient_name, contact_info]
    );
    if (reqResult.rowCount === 0) return res.status(404).json({ error: 'Request not found' });
    const request_id = reqResult.rows[0].request_id;

    await pool.query(
      `INSERT INTO PATIENT_SAMPLE(request_id, collection_date) VALUES ($1, $2)`,
      [request_id, collection_date]
    );

    res.json({ request_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get request_id by patient_name and contact_info
router.get('/id', async (req, res) => {
  const { patient_name, contact_info } = req.query;
  try {
    const result = await pool.query(
      `SELECT request_id FROM REQUEST WHERE patient_name = $1 AND contact_info = $2`,
      [patient_name, contact_info]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
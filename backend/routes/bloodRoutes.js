import express from 'express';
import { pool } from '../server.js';
const router = express.Router();

// Insert blood collection
router.post('/collection', async (req, res) => {
  const { name, contact_info, collection_date, volume_ml } = req.body;
  try {
    const donorRes = await pool.query(
      `SELECT donor_id FROM Donor WHERE name = $1 AND contact_info = $2`,
      [name, contact_info]
    );
    if (donorRes.rowCount === 0) return res.status(404).json({ error: "Donor not found" });

    const donor_id = donorRes.rows[0].donor_id;

    const insertRes = await pool.query(
      `INSERT INTO Blood_Collection(donor_id, collection_date, blood_type, rh_factor, volume_ml)
       SELECT $1, $2, blood_type, rh_factor, $3 FROM Donor WHERE donor_id = $1
       RETURNING collection_id`,
      [donor_id, collection_date, volume_ml]
    );
    res.json({ collection_id: insertRes.rows[0].collection_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get collection details
router.get('/collection', async (req, res) => {
  const { name, contact_info, collection_date } = req.query;
  try {
    const donorRes = await pool.query(
      `SELECT donor_id FROM Donor WHERE name = $1 AND contact_info = $2`,
      [name, contact_info]
    );
    if (donorRes.rowCount === 0) return res.status(404).json({ error: "Donor not found" });
    const donor_id = donorRes.rows[0].donor_id;

    const collRes = await pool.query(
      `SELECT * FROM Blood_Collection WHERE donor_id = $1 AND collection_date = $2`,
      [donor_id, collection_date]
    );
    res.json(collRes.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get collection by ID
router.get('/collection/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM Blood_Collection WHERE collection_id = $1`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert sample processing result
router.post('/processing', async (req, res) => {
  const { collection_id, hiv_test, hepatitis_b_test, hepatitis_c_test, syphilis_test, malaria_test } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Sample_Processing(collection_id, hiv_test, hepatitis_b_test, hepatitis_c_test, syphilis_test, malaria_test)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [collection_id, hiv_test, hepatitis_b_test, hepatitis_c_test, syphilis_test, malaria_test]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

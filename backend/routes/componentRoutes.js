// === componentRoutes.js ===
import express from 'express';
import { pool } from '../server.js';
const router = express.Router();

// Insert into Storage
router.post('/storage', async (req, res) => {
  const { component_type, storage_location, storage_temperature } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Storage(component_type, storage_location, storage_temperature)
       VALUES ($1, $2, $3) RETURNING storage_id`,
      [component_type, storage_location, storage_temperature]
    );
    res.json({ storage_id: result.rows[0].storage_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert into Components
router.post('/', async (req, res) => {
  const { collection_id, component_type, expiration_date, volume_ml, storage_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Components(collection_id, component_type, expiration_date, volume_ml, storage_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING component_id`,
      [collection_id, component_type, expiration_date, volume_ml, storage_id]
    );
    res.json({ component_id: result.rows[0].component_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get component_id by collection_id + component_type
router.get('/', async (req, res) => {
  const { collection_id, component_type } = req.query;
  try {
    const result = await pool.query(
      `SELECT component_id FROM Components WHERE collection_id = $1 AND component_type = $2`,
      [collection_id, component_type]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all components in inventory
router.get('/inventory', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, s.storage_location, s.storage_temperature 
       FROM Components c 
       JOIN Storage s ON c.storage_id = s.storage_id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

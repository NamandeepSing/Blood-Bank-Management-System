import express from 'express';
import { pool } from '../server.js';

const router = express.Router();

const queries = {
  1: `SELECT rq.request_id, com.component_id FROM REQUEST AS rq
      INNER JOIN Components AS com ON rq.component_type = com.component_type
      WHERE (rq.request_id, com.component_id) NOT IN (SELECT request_id, component_id FROM TESTING)`,

  2: `WITH A AS (
        SELECT collection_id FROM Sample_Processing
        WHERE (hiv_test = true OR hepatitis_b_test = true OR hepatitis_c_test = true OR syphilis_test = true OR malaria_test = true)
      )
      SELECT DISTINCT donor_id FROM Blood_Collection 
      INNER JOIN A ON Blood_Collection.collection_id = A.collection_id`,

  3: `SELECT component_id FROM Components WHERE expiration_date < CURRENT_DATE`,

  4: `SELECT request_id FROM REQUEST WHERE request_date + INTERVAL '1 month' < CURRENT_DATE`,

  5: `WITH A(test) AS (
        SELECT testing_id FROM MATCHING
        WHERE ABO_compatibility = true AND Rh_compatibility = true AND cross_matching = true
      )
      SELECT DISTINCT TESTING.request_id FROM TESTING
      INNER JOIN A ON TESTING.testing_id = A.test`,

  6: `SELECT bc.donor_id, d.name, COUNT(bc.collection_id) AS total_donations
      FROM Blood_Collection bc JOIN Donor d ON bc.donor_id = d.donor_id
      GROUP BY bc.donor_id, d.name ORDER BY total_donations DESC`,

  7: `SELECT bc.blood_type, COUNT(c.component_id) AS total_units
      FROM Components c JOIN Blood_Collection bc ON c.collection_id = bc.collection_id
      JOIN Storage s ON c.storage_id = s.storage_id
      GROUP BY bc.blood_type ORDER BY total_units DESC`,

  8: `SELECT r.request_id, r.patient_name, r.hospital
      FROM REQUEST r
      WHERE EXISTS (
        SELECT 1 FROM SATISFIED_REQUESTS sr WHERE sr.request_date = r.request_date
      )`,

  9: `SELECT d.donor_id, d.name, COUNT(bc.collection_id) AS total_donations
      FROM Donor d JOIN Blood_Collection bc ON d.donor_id = bc.donor_id
      GROUP BY d.donor_id, d.name HAVING COUNT(bc.collection_id) > 3`,

  10: `SELECT component_id, component_type, expiration_date
        FROM Components
        WHERE expiration_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
        ORDER BY expiration_date ASC`,

  11: `SELECT component_type, COUNT(*) AS request_count
        FROM REQUEST
        GROUP BY component_type
        ORDER BY request_count DESC
        LIMIT 1`,

  12: `SELECT d.donor_id, d.name, COUNT(bc.collection_id) AS donations
        FROM Donor d JOIN Blood_Collection bc ON d.donor_id = bc.donor_id
        GROUP BY d.donor_id, d.name
        ORDER BY donations DESC
        LIMIT 5`,

  13: `SELECT r.request_id, r.patient_name, r.blood_type
        FROM REQUEST r
        WHERE NOT EXISTS (
          SELECT 1 
          FROM Components c
          JOIN Blood_Collection bc ON c.collection_id = bc.collection_id
          WHERE bc.blood_type = r.blood_type
          AND c.component_type = r.component_type
        )`,
};

router.get('/query/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const query = queries[id];

  if (!query) {
    return res.status(400).json({ error: 'Invalid query ID' });
  }

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

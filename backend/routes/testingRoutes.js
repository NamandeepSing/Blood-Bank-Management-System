import express from 'express';
import { pool } from '../server.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const {
    component_id,
    request_id,
    test_date,
    ABO_compatibility,
    Rh_compatibility,
    cross_matching
  } = req.body;

  try {
    // Insert into TESTING
    const result = await pool.query(
      `INSERT INTO TESTING(component_id, request_id, test_date)
       VALUES ($1, $2, $3) RETURNING testing_id`,
      [component_id, request_id, test_date]
    );
    const testing_id = result.rows[0].testing_id;

    // Insert into MATCHING
    await pool.query(
      `INSERT INTO MATCHING(testing_id, ABO_compatibility, Rh_compatibility, cross_matching)
       VALUES ($1, $2, $3, $4)`,
      [testing_id, ABO_compatibility, Rh_compatibility, cross_matching]
    );

    // Check if all matchings are true
    const allCompatible =
      ABO_compatibility === true &&
      Rh_compatibility === true &&
      cross_matching === true;

    if (allCompatible) {
      // Get component_type and request details for comparison and archiving
      const details = await pool.query(`
        SELECT r.blood_type, r.component_type AS request_component_type, r.patient_name,
               r.patient_age, r.request_date, r.hospital,
               c.component_type AS component_component_type
        FROM REQUEST r
        JOIN COMPONENTS c ON r.request_id = $1 AND c.component_id = $2
      `, [request_id, component_id]);

      const row = details.rows[0];

      if (row && row.request_component_type === row.component_component_type) {
        // Delete component (CASCADE will remove TESTING too)
        await pool.query(`DELETE FROM COMPONENTS WHERE component_id = $1`, [component_id]);

        // Delete request and archive
        await pool.query(`
          DELETE FROM REQUEST WHERE request_id = $1
        `, [request_id]);

        await pool.query(`
          INSERT INTO SATISFIED_REQUESTS (blood_type, component_type, patient_name, patient_age, request_date, hospital)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          row.blood_type,
          row.request_component_type,
          row.patient_name,
          row.patient_age,
          row.request_date,
          row.hospital
        ]);

        return res.json({ message: 'Matching successful. Request and Component removed. Request archived.', testing_id });
      }
    }

    res.json({ message: 'Inserted into TESTING and MATCHING', testing_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
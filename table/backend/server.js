const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'apexcura-dev-hydrds.cj80i20cajj0.ap-south-2.rds.amazonaws.com',
  database: 'apex_clinic',
  password: 'qTuEsJ53S9edSkAv7t1G',
  port: 5432,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY appointment_from_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/working_hours', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM working_hours');
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

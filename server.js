const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./config/db');

const donorRoutes = require('./routes/donorRoutes');
app.use('/api/donors', donorRoutes);

app.get('/', (req, res) => {
  res.send('✅ Blood Donation System API is running');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

db.getConnection((err) => {
  if (err) {
    console.error('Failed to connect to DB. Exiting...');
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});
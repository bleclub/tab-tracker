const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 5000;

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  res.send({
    message: `Hello ${req.body.email}!! Your user was registered!`,
  });
});

// Listen on environment port or 5000
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.get('/status', (req, res) => {
  res.send({
    message: 'Welcome to my server',
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Connect to Database
mongoose
  .connect(process.env.DB_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(`Connected to the database!`);
  })
  .catch((err) => {
    console.log(err);
  });

//   Routes prefix
app.use('/api/posts', require('./routes/postRoutes'));

//   Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: String,
  category: Array,
  details: String,
  photo: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', postSchema);

const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  coups: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Score', ScoreSchema);
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  option: String,
  count: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;

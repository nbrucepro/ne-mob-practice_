const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({  
  count: {
    type: Number,
    default: 0,
  },
  option: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Options',    
  },
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique:true
  }],
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;

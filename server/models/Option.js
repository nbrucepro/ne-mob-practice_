const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    name:String
});

const Option = mongoose.model('Options',optionSchema);
module.exports = Option;
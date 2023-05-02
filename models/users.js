const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, 
    required:[true, 'must provide mane'],
    maxLength:[20,'name can not be  more than 20 characters '],
    trim:true,},
  password: { type: String, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

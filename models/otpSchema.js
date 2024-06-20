const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone:{
    type: Number
  },
  otp:{
    type: String
  },
  created_at:{
    type:Date,
  },
  updated_at:{
    type:Date
  },

});

module.exports = mongoose.model('otp', otpSchema)  
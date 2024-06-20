const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String
  },
  phone:{
    type: String,
  },
  email:{
    type: String
  },
  otp:{
    type: Number
  },
  balance:{
    type: Number,
  },
  status:{
    type: Boolean
  },
  status_message:{
    type: String
  },
  notes:{
    type: Array
  },
  bank_name:{
    type: String
  },
  account_no:{
    type: String
  },
  created_at:{
    type: Date,
  },
  updated_at:{
    type: Date
  },

});

module.exports = mongoose.model('users', userSchema)  
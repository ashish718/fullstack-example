const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  device:{
    type: String
  },
  browser:{
    type: String
  },
  created_at:{
    type:Date,
  },
  updated_at:{
    type:Date
  },

});

module.exports = mongoose.model('login', loginSchema)  
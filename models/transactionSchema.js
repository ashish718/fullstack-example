const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type:{
    type: String
  },
  amount:{
    type: Number
  },
  email:{
    type: String
  },
  merchant:{
    type: String
  },
  created_at:{
    type:Date,
  },
  updated_at:{
    type:Date
  },

});

module.exports = mongoose.model('transaction', transactionSchema)  
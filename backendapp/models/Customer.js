const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  customerid: {
    type: Schema.Types.ObjectId
  },
  meterids: {
    type: [String],
    required: true
  },
  customertoken: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('customer', CustomerSchema);

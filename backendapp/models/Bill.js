const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  operatorname: {
    type: String
  },
  customer: {
    type: Schema.Types.ObjectId
  },
  customername: {
    type: String
  },
  meterid: {
    type: String
  },
  amountdue: {
    type: String
  },
  duedate: {
    type: Date,
    default: Date.now
  },
  consumedkw: {
    type: String
  },
  reading: {
    type: String
  },
  previous: {
    type: String
  },
  readdate: {
    type: Date,
    default: Date.now
  },
  paid: {
    type: Boolean
  },
  paidamount: {
    type: String
  },
  paymentmethod: {
    type: String
  },
  paiddate: {
    type: Date
  },
  customertoken: {
    type: String
  },  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('bill', BillSchema);

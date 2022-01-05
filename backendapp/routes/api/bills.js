const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Bill = require('../../models/Bill');
const User = require('../../models/User');
const Customer = require('../../models/Customer');
const checkObjectId = require('../../middleware/checkObjectId');
const rateKW = 1.7;
var mongodb = require('mongodb');

// @route    POST api/bills
// @desc     Create a post
// @access   Private
router.post(
  '/',
  check('userid', 'Reading is required').notEmpty(),
  check('reading', 'Reading is required').notEmpty(),
  check('customerid', 'customer id is required').notEmpty(),
  check('meterid', 'meter id is required').notEmpty(),
  // userid, customerId, electricMeterId, currentReading
  // readDate is server date -- now, 

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerid, reading, meterid, userid } = req.body;
    
    try {
      const user = await User.findById(userid).select('-password');
      const customer = await User.findById(customerid).select('-password');

      const customerDetail = await Customer.find({customerid: mongodb.ObjectId(customerid)});
      let customertoken = customerDetail.length > 0 ? customerDetail[0].customertoken : "";
      const previousbill = await Bill.find({customer: customerid, meterid},{reading:1}, { sort: { readdate: -1 }});      
      let previous = previousbill.length > 0 ? previousbill[0].reading : 0;
      let consumedkw = reading - previous;

      const newBill = new Bill({
        user: userid,
        operatorname: user.name,
        customer: customerid,
        customername: customer.name,
        customertoken,
        meterid,
        reading,
        previous,
        consumedkw,
        amountdue: consumedkw * rateKW
      });

      const bill = await newBill.save();

      res.json(bill);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/bills
// @desc     Get all bills
// @access   Public
router.get('/',  async (req, res) => {
  try {
    const bills = await Bill.find().sort({ date: -1 });
    res.json(bills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/bills/:id
// @desc     Get bill by ID
// @access   Public
router.get('/:id',  checkObjectId('id'), async (req, res) => {
  try {
    const bill = await Bill.findById( req.params.id ).sort({ date: -1 });


    if (!bill) {
      return res.status(404).json({ msg: 'Bill not found' });
    }

    res.json(bill);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/bills/:id
// @desc     Update bills bill id
// @access   Public
router.put('/:id',  
  check('reading', 'reading is required').notEmpty(),
  check('duedate', 'duedate is required').notEmpty(),
  checkObjectId('id'), 
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reading, duedate } = req.body;

    try {
      const bill = await Bill.findById(req.params.id);

      // Check if the post has not yet been liked
      if (!bill) {
        return res.status(400).json({ msg: `Billing id ${req.params.id} not found` });
      }

      if (reading < bill.previous ) {
        return res.status(400).json({ msg: `Please adjust value of reading, should not be less than previous (${bill.previous})` });
      }

      bill.reading = reading;
      bill.duedate = duedate;
      bill.consumedkw = reading - bill.previous;
      bill.amountdue = rateKW * (reading - bill.previous);

      await bill.save();

      return res.json(bill);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Customer = require('../../models/Customer');
const Bill = require('../../models/Bill');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    POST api/profile
// @desc     Create or update customer
// @access   Public
router.post(
  '/',
  check('user', 'user is required').notEmpty(),
  check('customerid', 'customerid is required').notEmpty(),
  check('meterids', 'meterids is required').notEmpty(),
  check('customertoken', 'customertoken is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      customerid,
      meterids,
      user,
      customertoken,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a customer
    const customerFields = {
      user,
      customerid,
      customertoken, 
      meterids: Array.isArray(meterids)
        ? meterids
        : meterids.split(',').map((meterid) => meterid.trim()),
      ...rest
    };


    try {
      // Using upsert option (creates new doc if no match is found):
      let customerObj = await Customer.findOneAndUpdate(
        { customerid },
        { $set: customerFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(customerObj);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);


// @route    GET api/customer
// @desc     Get all customers
// @access   Public
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ date: -1 }).populate('user', ['name', 'avatar']);
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route    GET api/customer
// @desc     Get all customers
// @access   Public
router.get('/:id', checkObjectId('id'),async (req, res) => {
  try {
    const customers = await Customer.find({customerid:req.params.id});
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/customer/:id
// @desc     Get bills by customer ID
// @access   Public
router.get('/bills/:id', checkObjectId('id'), async (req, res) => {

  try {
    const bills = await Bill.find( {customer: req.params.id} ).sort({ date: -1 });

    if (!bills) {
      return res.status(404).json({ msg: 'Bill not found' });
    }

    res.json(bills);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;

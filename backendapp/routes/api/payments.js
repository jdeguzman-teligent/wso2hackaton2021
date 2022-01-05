const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Bill = require('../../models/Bill');

// @route    POST api/payments
// @desc     payement
// @access   Public
router.post(
  '/',
  check('billingid', 'billing id is required').notEmpty(),
  check('paymentmethod', 'payment method is required').notEmpty(),
  check('amount', 'amount is required').notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { billingid, paymentmethod, amount } = req.body;

    try {
      const bill = await Bill.findById(billingid);

      // Check if the post has not yet been liked
      if (!bill) {
        return res.status(400).json({ msg: `Billing id ${req.params.id} not found` });
      }

      bill.paid = true;
      bill.paymentmethod = paymentmethod;
      bill.paiddate = Date.now();
      bill.paidmaount = amount;

      await bill.save();

      return res.json(bill);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

  }
);


module.exports = router;

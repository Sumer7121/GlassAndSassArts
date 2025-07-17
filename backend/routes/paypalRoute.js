import express from 'express';
import { client } from '../config/paypal.js';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

const router = express.Router();

// Create PayPal order
router.post('/create-order', async (req, res) => {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: req.body.amount
      }
    }]
  });

  try {
    const order = await client().execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Capture PayPal order
router.post('/capture-order', async (req, res) => {
  const orderId = req.body.orderID;
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
    res.json({ capture: capture.result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

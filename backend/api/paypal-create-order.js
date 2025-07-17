import { client } from '../config/paypal.js';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
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
    res.status(200).json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

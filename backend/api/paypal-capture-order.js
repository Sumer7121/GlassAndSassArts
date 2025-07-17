import { client } from '../config/paypal.js';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const orderId = req.body.orderID;
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
    res.status(200).json({ capture: capture.result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

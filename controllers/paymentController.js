import Razorpay from 'razorpay';
import crypto from 'crypto';


const razorpay = new Razorpay({
  key_id: 'rzp_test_uKu5uCIGgqGkaW',
  key_secret: 'NUAAfIKxHLTFivdCUBdJXC78',
});

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise (1 INR = 100 paise)
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify payment signature
const verifyPayment = (req, res) => {
  try {
    const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = `${order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {createOrder, verifyPayment };

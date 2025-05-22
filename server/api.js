import express from 'express';
import cors from 'cors';

const secretKey = 'xnd_development_tXbcsCoAUjYAqB0YBhSverOSKY52hAASzOG06ggAz2LzXnouBM4UeFU83KD0U2LR';
const allowedOrigins = ['http://localhost:3000'];

import { Xendit, Balance as BalanceClient} from 'xendit-node';
const xenditBalanceClient = new BalanceClient({secretKey: secretKey});

const app = express();
const PORT = 5050;

app.use(express.json()); 

app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ["GET", "POST"],
  credentials: true
}));

app.get('/api/balance', async (req, res) => {
  try {
    const response = await xenditBalanceClient.getBalance({});
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error('Error getting balance:', err);
    res.status(500).json({ error: 'Gagal ambil balance' });
  }
});

app.post('/api/ovo-payment', async (req, res) => {

    const { amount, externalID, phone } = req.body;

    try {
    const response = await PaymentRequest.createPaymentRequest({
      reference_id: externalID,
      currency: 'IDR',
      amount: amount,
      description: 'Pembayaran via OVO',
      payment_method: {
        type: 'EWALLET',
        reusability: 'ONE_TIME_USE',
        customer_id: externalID, // opsional, tapi disarankan
        ewallet: {
          channel_code: 'ID_OVO',
          channel_properties: {
            mobile_number: phone, // gunakan nomor HP dari body
            success_redirect_url: 'https://domain.com/success '
          }
        }
      }
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Full error:', JSON.stringify(error.response?.data, null, 2));
    res.status(500).json({ error: 'Payment failed' });
  }
  
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready di http://localhost:${PORT}`);
});

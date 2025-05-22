import express from 'express';
import cors from 'cors';

const secretKey = 'xnd_development_tXbcsCoAUjYAqB0YBhSverOSKY52hAASzOG06ggAz2LzXnouBM4UeFU83KD0U2LR';
const allowedOrigins = ['http://localhost:3000'];

import { Xendit, Balance as BalanceClient, PaymentRequest as PaymentRequestClient} from 'xendit-node';
const xenditBalanceClient = new BalanceClient({secretKey: secretKey});
const xenditPaymentRequestClient = new PaymentRequestClient({secretKey: secretKey});

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

    const data = {
      country: 'ID',
      amount: 15000,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            mobile_number: '+628123456789',
            successReturnUrl: 'http://localhost:3000/admin',
          },
          channelCode: 'SHOPEEPAY',
        },
        reusability: 'ONE_TIME_USE',
        type: 'EWALLET',
      },
      currency: 'IDR',
      referenceId: 'example-ref-1234',
    };

    const response = await xenditPaymentRequestClient.createPaymentRequest({
      data,
    });

    res.status(200).json({ 
      id: response.id, 
      url: response.actions[0].url
    });
  
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready di http://localhost:${PORT}`);
});

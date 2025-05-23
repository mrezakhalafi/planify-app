import express from 'express';
import cors from 'cors';

const secretKey = 'xnd_development_tXbcsCoAUjYAqB0YBhSverOSKY52hAASzOG06ggAz2LzXnouBM4UeFU83KD0U2LR';
const allowedOrigins = ['http://localhost:3000'];

import { Balance as BalanceClient, PaymentRequest as PaymentRequestClient} from 'xendit-node';
const xenditBalanceClient = new BalanceClient({secretKey: secretKey});
const xenditPaymentRequestClient = new PaymentRequestClient({secretKey: secretKey});

const app = express();
const PORT = 5000;

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
            mobileNumber: '6281234567890'
          },
          channelCode: 'OVO',
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
      id: response.id
    });
  
});

app.post('/api/dana-payment', async (req, res) => {

    const data = {
      country: 'ID',
      amount: 15000,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            mobileNumber: '6281234567890',
            successReturnUrl: 'http://localhost:3000/admin',
          },
          channelCode: 'DANA',
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

app.post('/api/shopeepay-payment', async (req, res) => {

    const data = {
      country: 'ID',
      amount: 15000,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            mobileNumber: '6281234567890',
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

app.post('/api/qris-payment', async (req, res) => {

  const data = {
    amount: 15000,
    metadata: {
      sku: 'example-sku-1234'
    },
    paymentMethod: {
      qrCode: {
        channelCode: 'QRIS'
      },
      reusability: 'ONE_TIME_USE',
      type: 'QR_CODE'
    },
    currency: 'IDR',
    referenceId: 'example-ref-1234'
  };

    const response = await xenditPaymentRequestClient.createPaymentRequest({data});

    res.status(200).json({ 
      id: response.id, 
      id_qr: response.paymentMethod.id, 
      qr: response.paymentMethod.qrCode.channelProperties.qrString
    });
  
});

app.post('/api/qris-payment-submit', async (req, res) => {

  const response = await fetch(`https://api.xendit.co/qr_codes/${req.body.externalID}/payments/simulate`, {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
    },
  });

  console.log('ddd',`https://api.xendit.co/qr_codes/${req.body.externalID}/payments/simulate`);

  const data = await response.json();
  res.status(200).json(data);
  
});

app.get('/api/check-payment/:id', async (req, res) => {

  const response = await xenditPaymentRequestClient.getPaymentRequestByID({ 
    paymentRequestId: req.params.id
  });
  res.status(200).json(response.status);

});

app.listen(PORT, () => {
  console.log(`🚀 Server ready di http://localhost:${PORT}`);
});

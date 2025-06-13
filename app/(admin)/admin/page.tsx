"use client";
import React, { useEffect, useRef } from "react";
import { QRCodeSVG } from 'qrcode.react';

export default function Admin() {
  const [amount, setAmount] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [qr, setQR] = React.useState('');
  const recaptchaRef = useRef(null);

  const checkPay = async () => {
    const response = await fetch(`http://localhost:5000/api/balance`);
    const data = await response.json();
    setAmount(data.balance);
  };

  const checkPayment = async () => {
    const response = await fetch(`http://localhost:5000/api/check-payment/${localStorage.getItem('id_payment')}`);
    const data = await response.json();
    console.log(data);

    if (data == "SUCCEEDED"){
      alert("Payment Success");
      localStorage.removeItem('id_payment');
    }

  };

  useEffect(() => {
    const token = localStorage.getItem('id_payment');

    if (token){
      checkPayment();
    }
  }, []);

  async function payWithOVO() {
    const response = await fetch('http://localhost:5000/api/ovo-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 50000,
        externalID: 'invoice-12345',
        phone: '081234567890',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log(data);
      localStorage.setItem('id_payment', data.id);

      setTimeout(() => {
        checkPayment();
      }, 5000);
      // window.location.href = data.url;
    } else {
      console.error('Payment error:', data.error);
    }
  }

  async function payWithDana() {
    const response = await fetch('http://localhost:5000/api/dana-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 50000,
        externalID: 'invoice-12345',
        phone: '081234567890',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log(data);
      localStorage.setItem('id_payment', data.id);
      window.location.href = data.url;
    } else {
      console.error('Payment error:', data.error);
    }
  }

  async function payWithShopeePay() {
    const response = await fetch('http://localhost:5000/api/shopeepay-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 50000,
        externalID: 'invoice-12345',
        phone: '081234567890',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log(data);
      localStorage.setItem('id_payment', data.id);
      window.location.href = data.url;
    } else {
      console.error('Payment error:', data.error);
    }
  }

  async function payWithQRIS() {
    const response = await fetch('http://localhost:5000/api/qris-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 50000,
        externalID: 'invoice-12345'
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log(data);
      localStorage.setItem('id_payment', data.id);
      localStorage.setItem('id_payment_qr', data.id_qr);
      setQR(data.qr);

    } else {
      console.error('Payment error:', data.error);
    }
  }

  async function payQRIS() {
    const response = await fetch('http://localhost:5000/api/qris-payment-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        externalID: localStorage.getItem('id_payment_qr')
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log(data);
      // localStorage.setItem('id_payment', data.id);
      
      // setQR(data.qr);

    } else {
      console.error('Payment error:', data.error);
    }
  }

function signInWithGoogle() {
  window.location.href = 'http://localhost:5000/auth/google';
}

function signInWithFacebook() {
  window.location.href = 'http://localhost:5000/auth/facebook';
}

async function sendSMS() {
   const response = await fetch('http://localhost:5000/auth/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: '123456',
      }),
    });

    const data = await response.json();

    if (response.ok) {

    } else {
      console.error('SMS error:', data.error);
    }
}

 useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-400 p-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Xendit Transaction & Login OAuth & ReCaptcha Google</h1>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={checkPay}>
                Check Balance
            </button>
            {amount && <p className="mt-4 pt-2 text-center text-1xl font-large text-gray-800">Saldo Anda : Rp {amount}</p>}
            <hr className="my-5"/>
            <div className="mt-4">
                <label className="block text-1xl font-large text-gray-700 mb-1">Harga : Rp 500.000</label>
                {/* <input type="number" className="block w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={price} onChange={e => setPrice(parseInt(e.target.value, 10))} /> */}
            </div>
            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={payWithOVO}>
                Pay With OVO
            </button>
            <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={payWithDana}>
                Pay With Dana
            </button>
            <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={payWithShopeePay}>
                Pay With ShopeePay
            </button>
            <button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={payWithQRIS}>
                Pay With QRIS
            </button>
            {qr && (
              <div className="mt-6 flex justify-center items-center flex-col">
                <p className="text-gray-800 font-semibold mb-2">Scan QRIS di bawah ini:</p>
                <QRCodeSVG value={qr} size={256} />
                <button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={payQRIS}>
                    Pay QRIS
                </button>
                 <button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={checkPayment}>
                    Check QRIS
                </button>
              </div>
            )}
            <hr className="my-5"/>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={signInWithGoogle}>
              Sign In With Google
            </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mt-4" onClick={signInWithFacebook}>
              Sign In With Facebook
            </button>
            <hr className="my-5"/>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300" onClick={sendSMS}>
              Send OTP via SMS
            </button>
            <hr className="my-5"/>
              <div
              className="g-recaptcha"
              data-sitekey="6LeW3eMZAAAAAFVF6bdO3hLDh5zyI3l4q07Vlf3h"
              ref={recaptchaRef}>
            </div>
        </div>
    </main>
  );
}


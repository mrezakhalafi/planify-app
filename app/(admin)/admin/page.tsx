"use client";
import React, { useEffect } from "react";

export default function Admin() {
  const [amount, setAmount] = React.useState('');
  const [price, setPrice] = React.useState('');

  const checkPay = async () => {
    const response = await fetch(`http://localhost:5050/api/balance`);
    const data = await response.json();
    setAmount(data.balance);
  };

  const checkPayment = async () => {
    const response = await fetch(`http://localhost:5050/api/check-payment/${localStorage.getItem('id_payment')}`);
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
    const response = await fetch('http://localhost:5050/api/ovo-payment', {
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

  return (
    <main className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-4">Xendit Transaction</h1>
        <div className="bg-white p-4 rounded-md shadow-md">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={checkPay}>Check Balance</button>
            {amount && <p className="mt-2">Rp {amount}</p>}
            <label className="block mt-2">
                <span className="text-gray-700">Harga</span>
                {/* <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={price} onChange={e => setPrice(parseInt(e.target.value, 10))} /> */}
            </label>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={payWithOVO}>Pay OVO</button>
        </div>
    </main>
  );
}


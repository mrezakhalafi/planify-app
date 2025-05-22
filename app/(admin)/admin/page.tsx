"use client";
import React from "react";

export default function Admin() {
  const [amount, setAmount] = React.useState('');

  const checkPay = async () => {
    const response = await fetch(`http://localhost:5050/api/balance`);
    const data = await response.json();
    setAmount(data.balance);
  };

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
      console.log('Payment created:', data);
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

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={payWithOVO}>Pay OVO</button>
        </div>
    </main>
  );
}


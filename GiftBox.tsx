import React, { useState } from 'react';

const GiftBox = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
      <option value="">Select Payment Method</option>
      <option value="paypal">PayPal</option>
      <option value="creditcard">Credit Card</option>
      <option value="banktransfer">Bank Transfer</option>
    </select>
  );
};

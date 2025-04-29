import { toast } from 'react-toastify';
import React, { useState } from 'react';

const CommunitySection = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const sanitizedEmail = email.trim();
    const sanitizedPhone = phone.trim();
    
    if (!validateEmail(sanitizedEmail) || !validatePhone(sanitizedPhone)) {
      toast.error("Please enter valid email and phone number.");
      return;
    }

    // Submit data logic
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields for email and phone */}
    </form>
  );
};

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';

const BoxOpeningModal = ({ boxId }) => {
  useEffect(() => {
    const checkAvailability = async () => {
      const response = await fetch(`/api/boxes/${boxId}/availability`);
      const data = await response.json();
      
      if (!data.isAvailable) {
        toast.warn("This box is currently sold out.");
      }
    };

    checkAvailability();
  }, [boxId]);

  const handlePayment = async () => {
    try {
      // Assume payment logic here
      toast.success("Payment request sent successfully!");
    } catch (error) {
      toast.error("Failed to send payment request.");
    }
  };

  return (
    // Your modal JSX goes here
  );
};

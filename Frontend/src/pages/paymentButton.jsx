import React from 'react';
import axios from 'axios';

const PaymentButton = ({amount, shippingAddress}) => {
    const handlePayment = async () => {
        try {
            // Create order via backend
            const response = await axios.post('http://localhost:3000/api/payment/create-order', {
                amount: amount, // Amount in rupees
                currency: 'INR',
            });

            const { id: order_id, amount:orderAmount, currency } = response.data;
            //  console.log('Order created:', response.data);
            //  console.log('RazorPay Key ID:', import.meta.env.VITE_RAZORPAY_KEY_ID);
            // Set up RazorPay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your RazorPay Key ID
                amount: orderAmount, // Amount in paise
                currency: currency,
                name: "E_commerce Strore",
                description: "Test Transaction",
                order_id: order_id,
                handler: (response) => {
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };
return (
    <button  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" onClick={handlePayment}>
      pay now {amount}
    </button>
  );

   
};

export default PaymentButton;
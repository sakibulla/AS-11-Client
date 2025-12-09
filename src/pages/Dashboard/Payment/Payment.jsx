import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const Payment = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // -----------------------------
  // HANDLE PAYMENT FUNCTION HERE
  // -----------------------------
  const handlePayment = async () => {
    if (!booking) return;

    const paymentInfo = {
      cost: booking.price,
      id: booking._id,
      senderEmail: booking.userEmail,
      parcelName: booking.serviceName,
    };

    try {
      const res = await fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentInfo),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe checkout
      } else {
        toast.error('Failed to initiate payment');
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:3000/bookings/${bookingId}`);
        const data = await res.json();

        if (data.success) {
          setBooking(data.result);
        } else {
          setError(data.message || 'Booking not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch booking');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <div className="text-center p-6">Loading booking...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;
  if (!booking) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pay for {booking.serviceName}</h2>
      <p><strong>Price:</strong> ${booking.price}</p>
      <p><strong>Date:</strong> {booking.bookingDate}</p>
      <p><strong>Location:</strong> {booking.location}</p>
      <p><strong>Status:</strong> {booking.status}</p>

      {/* Payment button */}
      <button
        onClick={handlePayment} // <- attach function here
        className="btn btn-primary mt-4"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;

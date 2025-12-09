import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentHistory = ({ userEmail }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const url = userEmail
          ? `http://localhost:3000/payments?customerEmail=${encodeURIComponent(userEmail)}`
          : `http://localhost:3000/payments`;
        const res = await axios.get(url);
        setPayments(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch payment history');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userEmail]);

  if (loading) return <div>Loading payment history...</div>;
  if (error) return <div>{error}</div>;

  if (payments.length === 0) return <div>No payment history found.</div>;

  return (
    <div className="payment-history">
      <h2>Payment History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Transaction ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Service Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Currency</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Payment Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Paid At</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tracking ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.transactionId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.parcelName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${payment.amount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.currency}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.paymentStatus}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {new Date(payment.paidAt).toLocaleString()}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.trackingId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;

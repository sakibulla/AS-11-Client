import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setError('User not logged in.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);
        const url = `https://xdecor.vercel.app/payments?customerEmail=${encodeURIComponent(userEmail)}`;
        const res = await axios.get(url);
        setPayments(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch payment history.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userEmail]);

  if (loading) return <div className="text-center p-6">Loading payment history...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;
  if (payments.length === 0) return <div className="text-center p-6 text-gray-500">No payment history found.</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left text-gray-700">Transaction ID</th>
              <th className="border px-4 py-2 text-left text-gray-700">Service Name</th>
              <th className="border px-4 py-2 text-left text-gray-700">Amount</th>
              <th className="border px-4 py-2 text-left text-gray-700">Currency</th>
              <th className="border px-4 py-2 text-left text-gray-700">Payment Status</th>
              <th className="border px-4 py-2 text-left text-gray-700">Paid At</th>
              <th className="border px-4 py-2 text-left text-gray-700">Tracking ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr
                key={payment._id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="border px-4 py-2">{payment.transactionId}</td>
                <td className="border px-4 py-2">{payment.parcelName}</td>
                <td className="border px-4 py-2">${payment.amount}</td>
                <td className="border px-4 py-2">{payment.currency}</td>
                <td className={`border px-4 py-2 font-semibold ${
                  payment.paymentStatus.toLowerCase() === 'paid' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {payment.paymentStatus}
                </td>
                <td className="border px-4 py-2">
                  {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : '-'}
                </td>
                <td className="border px-4 py-2">{payment.trackingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from '../../hooks/useAuth';

const Revenue = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `https://xdecor.vercel.app/payments?customerEmail=${user.email}`
        );

        setPayments(response.data);
      } catch (err) {
        setError("Failed to load revenue data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  // --- Revenue Calculations ---
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalTransactions = payments.length;

  if (loading)
    return <div className="text-center py-20 text-lg">Loading Revenue...</div>;

  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Revenue Overview</h2>

      {/* Revenue Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-green-600 text-white rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="p-6 bg-blue-600 text-white rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Transactions</h3>
          <p className="text-3xl font-bold mt-2">{totalTransactions}</p>
        </div>

        <div className="p-6 bg-purple-600 text-white rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Average Order Value</h3>
          <p className="text-3xl font-bold mt-2">
            ${totalTransactions ? (totalRevenue / totalTransactions).toFixed(2) : "0.00"}
          </p>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="overflow-x-auto shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Tracking ID</th>
              <th>Parcel</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.trackingId}</td>
                <td>{payment.parcelName}</td>
                <td>${payment.amount}</td>
                <td className="capitalize">{payment.paymentStatus}</td>
                <td>{new Date(payment.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue;

import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router'; // <-- add this

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:3000/bookings?userEmail=${user.email}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.email]);

  if (loading) return <div className="text-center p-6">Loading bookings...</div>;
  if (bookings.length === 0) return <div className="text-center p-6">No bookings found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="border p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">{booking.serviceName}</h3>
            <p><strong>Type:</strong> {booking.serviceType}</p>
            <p><strong>Price:</strong> ${booking.price}</p>
            <p><strong>Date:</strong> {booking.bookingDate}</p>
            <p><strong>Location:</strong> {booking.location}</p>
            <p><strong>Status:</strong> {booking.status}</p>
             <Link to={`/dashboard/payment/${booking._id}`}>
            <button  className='btn btn-primary'>Pay</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

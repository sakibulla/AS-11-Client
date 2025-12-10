import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

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

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this booking?")) return;

    try {
      const res = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setBookings(bookings.filter(b => b._id !== id));
        toast.success("Booking removed successfully");
      } else {
        toast.error(data.message || "Failed to remove booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove booking");
    }
  };

  if (loading) return <div className="text-center p-6">Loading bookings...</div>;
  if (bookings.length === 0) return <div className="text-center p-6">No bookings found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="border p-4 rounded shadow-md flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{booking.serviceName}</h3>
            <p><strong>Type:</strong> {booking.serviceType}</p>
            <p><strong>Price:</strong> ${booking.price}</p>
            <p><strong>Date:</strong> {booking.bookingDate}</p>
            <p><strong>Location:</strong> {booking.location}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p>
              <strong>Booking Status:</strong> 
              <span className={booking.bookingStatus === 'paid' ? 'text-green-600' : 'text-red-600'}>
                {booking.bookingStatus}
              </span>
            </p>
            <div className="flex gap-2">
              <Link to={`/dashboard/payment/${booking._id}`}>
                <button className='btn btn-primary'>Pay</button>
              </Link>
              <button 
                className="btn btn-error"
                onClick={() => handleRemove(booking._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

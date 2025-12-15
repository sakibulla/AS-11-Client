import React, { useEffect, useState, useMemo } from 'react';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router'; // corrected import

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(""); // '' | 'date' | 'status'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' | 'desc'

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`https://xdecor.vercel.app/bookings?userEmail=${user.email}`);
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
      const res = await fetch(`https://xdecor.vercel.app/bookings/${id}`, {
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

  // Sorted bookings using useMemo for optimization
  const sortedBookings = useMemo(() => {
    if (!sortBy) return bookings;

    return [...bookings].sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.bookingDate);
        const dateB = new Date(b.bookingDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "status") {
        return sortOrder === "asc"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
  }, [bookings, sortBy, sortOrder]);

  if (loading) return <div className="text-center p-6">Loading bookings...</div>;
  if (bookings.length === 0) return <div className="text-center p-6">No bookings found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {/* Sorting Controls */}
      <div className="flex gap-4 mb-6 items-center">
        <label>
          Sort By: 
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="">--Select--</option>
            <option value="date">Date</option>
            <option value="status">Status</option>
          </select>
        </label>

        <label>
          Order:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <div className="space-y-4">
        {sortedBookings.map((booking) => (
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

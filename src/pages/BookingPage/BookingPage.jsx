import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { toast } from 'react-toastify';

const BookingPage = () => {
  const { serviceId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true); // loading for fetching service
  const [bookingLoading, setBookingLoading] = useState(false); // loading for booking submission

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`https://xdecor.vercel.app/services/${serviceId}`);
        const data = await res.json();
        setService(data.result || data); // handle backend response
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDate || !location) {
      toast.error("Please fill all required fields");
      return;
    }

    const bookingData = {
      userName: user?.displayName || "Anonymous User",
      userEmail: user?.email || "anonymous@example.com",
      serviceId: service?._id || "dummy_service_id",
      serviceName: service?.serviceName || "Dummy Service",
      serviceType: service?.serviceType || "General",
      price: service?.price || 0,
      bookingDate,
      location,
      status: "Pending",
      assignedTo: "unassigned",
    };

    try {
      setBookingLoading(true);

      const response = await fetch('https://xdecor.vercel.app/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      // ✅ Corrected success check
      if (response.ok) {
        toast.success("Booking successful!");
        navigate('/'); // redirect to home
      } else {
        toast.error(result?.error || "Failed to book service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center p-6">Loading service...</div>;
  if (!service) return <div className="text-center p-6 text-red-500">Service not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Book {service.serviceName}</h1>
      <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">

        {/* User Info */}
        <input
          type="text"
          value={user?.displayName || "Anonymous User"}
          disabled
          className="border p-2 rounded w-full"
          placeholder="Your Name"
        />
        <input
          type="email"
          value={user?.email || "anonymous@example.com"}
          disabled
          className="border p-2 rounded w-full"
          placeholder="Your Email"
        />

        {/* Service Info (pre-filled & disabled) */}
        <input
          type="text"
          value={service.serviceName}
          disabled
          className="border p-2 rounded w-full bg-gray-100"
          placeholder="Service Name"
        />
        <input
          type="text"
          value={service.serviceType}
          disabled
          className="border p-2 rounded w-full bg-gray-100"
          placeholder="Service Type"
        />
        <input
          type="number"
          value={service.price}
          disabled
          className="border p-2 rounded w-full bg-gray-100"
          placeholder="Price"
        />

        {/* User input fields */}
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
          className="border p-2 rounded w-full"
          disabled={bookingLoading}
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          placeholder="Location"
          className="border p-2 rounded w-full"
          disabled={bookingLoading}
        />

        {/* Confirm Booking Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-2"
          disabled={bookingLoading}
        >
          {bookingLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              <span>Booking...</span>
            </>
          ) : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;

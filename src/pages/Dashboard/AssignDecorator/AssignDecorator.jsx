import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AssignDecorator = () => {
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all bookings
        const bookingsRes = await fetch('http://localhost:3000/bookings');
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);

        // Fetch all decorators
        const decoratorsRes = await fetch('http://localhost:3000/decorators');
        const decoratorsData = await decoratorsRes.json();
        setDecorators(decoratorsData);

      } catch (err) {
        console.error(err);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Assign/unassign decorator
  const handleAssign = async (bookingId, decoratorId) => {
    try {
      const res = await fetch(`http://localhost:3000/bookings/${bookingId}/assign-decorator`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedTo: decoratorId })
      });
      const data = await res.json();

      if (data.success) {
        toast.success(decoratorId === 'unassigned' ? 'Decorator unassigned' : 'Decorator assigned successfully');

        // Update UI immediately
        setBookings(prev => prev.map(b => 
          b._id === bookingId 
            ? { 
                ...b, 
                assignedTo: decoratorId, 
                bookingStatus: decoratorId && decoratorId !== 'unassigned' ? 'Decorator Assigned' : 'Pending' 
              } 
            : b
        ));
      } else {
        toast.error(data.message || 'Failed to update assignment');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  const getDecoratorName = (id) => {
    if (!id || id === 'unassigned') return 'Unassigned';
    const decorator = decorators.find(d => d._id === id);
    return decorator ? decorator.name : 'Unknown';
  };

  if (loading) return <div className="text-center p-6">Loading data...</div>;
  if (bookings.length === 0) return <div className="text-center p-6">No bookings available.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Decorators</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="border p-4 rounded shadow-md flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{booking.serviceName}</h3>
            <p><strong>Booked By:</strong> {booking.userName}</p>
            <p><strong>Date:</strong> {booking.bookingDate}</p>
            <p><strong>Location:</strong> {booking.location}</p>

            {/* Booking Status */}
            <p>
              <strong>Booking Status:</strong>{' '}
              <span className={booking.bookingStatus === 'Decorator Assigned' ? 'text-green-600' : 'text-yellow-600'}>
                {booking.bookingStatus}
              </span>
            </p>

            {/* Payment Status */}
            <p>
              <strong>Payment Status:</strong>{' '}
              <span className={booking.status === 'paid' ? 'text-green-600' : 'text-red-600'}>
                {booking.status === 'paid' ? 'Paid' : 'Unpaid'}
              </span>
            </p>

            <p><strong>Assigned To:</strong> {getDecoratorName(booking.assignedTo)}</p>

            <div className="flex gap-2 items-center">
              <select
                className="border p-2 rounded"
                value={booking.assignedTo || 'unassigned'}
                onChange={(e) => handleAssign(booking._id, e.target.value)}
              >
                <option value="unassigned">Unassigned</option>
                {decorators.map((decorator) => (
                  <option key={decorator._id} value={decorator._id}>
                    {decorator.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignDecorator;

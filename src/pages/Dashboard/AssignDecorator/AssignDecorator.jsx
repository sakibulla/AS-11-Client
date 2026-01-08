import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AssignDecorator = () => {
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch bookings
        const bookingsRes = await fetch('https://xdecor.vercel.app/bookings');
        if (!bookingsRes.ok) throw new Error('Failed to fetch bookings');
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);

        // Fetch decorators
        const decoratorsRes = await fetch('https://xdecor.vercel.app/decorators');
        if (!decoratorsRes.ok) throw new Error('Failed to fetch decorators');
        const decoratorsData = await decoratorsRes.json();

        // Filter out pending decorators
        const approvedDecorators = decoratorsData.filter(d => d.status !== 'pending');
        setDecorators(approvedDecorators);

      } catch (err) {
        console.error(err);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async (bookingId, decoratorId) => {
    try {
      const res = await fetch(
        `https://xdecor.vercel.app/bookings/${bookingId}/assign-decorator`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assignedTo: decoratorId })
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(
          decoratorId === 'unassigned'
            ? 'Decorator unassigned'
            : 'Decorator assigned successfully'
        );

        setBookings(prev =>
          prev.map(b =>
            b._id === bookingId
              ? {
                  ...b,
                  assignedTo: decoratorId,
                  bookingStatus:
                    decoratorId && decoratorId !== 'unassigned'
                      ? 'Decorator Assigned'
                      : 'Pending'
                }
              : b
          )
        );
      } else {
        toast.error(data.message || 'Failed to update assignment');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  const getDecoratorName = id => {
    if (!id || id === 'unassigned') return 'Unassigned';
    const decorator = decorators.find(d => d._id === id);
    return decorator ? decorator.name : 'Unknown';
  };

  if (loading)
    return <div className="text-center p-6 text-gray-500">Loading data...</div>;
  if (bookings.length === 0)
    return <div className="text-center p-6 text-gray-500">No bookings available.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Assign Decorators</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map(booking => (
          <div
            key={booking._id}
            className=" border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{booking.serviceName}</h3>
            <p className="text-gray-600"><span className="font-medium">Booked By:</span> {booking.userName}</p>
            <p className="text-gray-600"><span className="font-medium">Date:</span> {booking.bookingDate}</p>
            <p className="text-gray-600"><span className="font-medium">Location:</span> {booking.location}</p>

            <p className="mt-2">
              <span className="font-medium">Booking Status:</span>{' '}
              <span className={`px-2 py-1 rounded-full text-sm font-semibold ${booking.bookingStatus === 'Decorator Assigned' ? 'bg-green-500 text-green-800' : 'bg-yellow-500 text-yellow-800'}`}>
                {booking.bookingStatus}
              </span>
            </p>

            <p>
              <span className="font-medium">Payment Status:</span>{' '}
              <span className={`px-2 py-1 rounded-full text-sm font-semibold ${booking.status === 'paid' ? 'bg-green-500 text-green-800' : 'bg-red-500 text-red-800'}`}>
                {booking.status === 'paid' ? 'Paid' : 'Unpaid'}
              </span>
            </p>

            <p className="mt-2"><span className="font-medium">Assigned To:</span> {getDecoratorName(booking.assignedTo)}</p>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-1">Assign Decorator:</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                value={booking.assignedTo || 'unassigned'}
                onChange={e => handleAssign(booking._id, e.target.value)}
              >
                <option value="unassigned">Unassigned</option>
                {decorators.map(decorator => (
                  <option key={decorator._id} value={decorator._id}>{decorator.name}</option>
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

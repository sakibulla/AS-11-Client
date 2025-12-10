import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const statusOptions = [
  "Assigned",
  "Planning Phase",
  "Materials Prepared",
  "On the Way to Venue",
  "Setup in Progress",
  "Completed"
];

const AssignedDecorator = () => {
  const { user } = useAuth();

  // Fetch decorator info first
  const decoratorQuery = useQuery({
    queryKey: ['decorator', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/decorators?email=${user.email}`);
      const data = await res.json();
      return data[0] || null;
    }
  });

  const decorator = decoratorQuery.data;
  const decoratorId = decorator?._id;
  const earnings = decorator?.earnings || 0;

  // Fetch bookings assigned to this decorator
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ['bookings', decoratorId],
    enabled: !!decoratorId,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/bookings/decorator/${decoratorId}`);
      if (!res.ok) throw new Error('Failed to fetch bookings');
      return res.json();
    }
  });

  const handleBookingStatusUpdate = async (bookingId, currentStatus, newStatus) => {
    if (currentStatus === newStatus) return; // Prevent unnecessary update

    try {
      const res = await fetch(`http://localhost:3000/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingStatus: newStatus })
      });
      const data = await res.json();
      if (data.modifiedCount || data.success) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Booking status updated to "${newStatus}"`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update booking status!'
      });
    }
  };

  return (
    <div>
      <h2 className="text-4xl mb-2">My Assigned Bookings: {bookings.length}</h2>
      <h3 className="text-2xl mb-4">Total Earnings: ${earnings.toFixed(2)}</h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Booked By</th>
              <th>Date</th>
              <th>Location</th>
              <th>Booking Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <tr key={booking._id}>
                <th>{i + 1}</th>
                <td>{booking.serviceName}</td>
                <td>{booking.userName}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.location}</td>
                <td>
                  <span className={
                    booking.bookingStatus === 'Completed' ? 'text-green-600' :
                    'text-yellow-600'
                  }>
                    {booking.bookingStatus || 'Pending'}
                  </span>
                </td>
                <td>
                  <span className={booking.status === 'paid' ? 'text-green-600' : 'text-red-600'}>
                    {booking.status === 'paid' ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
                <td>
                  {booking.bookingStatus !== 'Completed' ? (
                    <select
                      className="select select-bordered"
                      value={booking.bookingStatus || "Assigned"}
                      onChange={(e) =>
                        handleBookingStatusUpdate(
                          booking._id,
                          booking.bookingStatus || "Assigned",
                          e.target.value
                        )
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-green-600">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDecorator;

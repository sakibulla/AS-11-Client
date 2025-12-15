import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveDecorator = () => {

    // Fetch decorators list
    const { refetch, data: decorators = [] } = useQuery({
        queryKey: ['decorators', 'pending'],
        queryFn: async () => {
            const res = await fetch('https://xdecor.vercel.app/decorators');
            if (!res.ok) throw new Error('Failed to fetch decorators');
            return res.json();
        }
    });
const handleDelete = async (decorator) => {
  const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete ${decorator.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });

  if (!confirm.isConfirmed) return;

  try {
    const res = await fetch(`https://xdecor.vercel.app/decorators/${decorator._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();

    if (res.ok && data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `${decorator.name} has been deleted.`,
        timer: 2000,
        showConfirmButton: false
      });
      refetch(); // Refresh the decorators list
    } else {
      throw new Error(data.message || 'Failed to delete decorator');
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message || 'Something went wrong while deleting!'
    });
  }
};

    // Update decorator status
    const updateDecoratorStatus = async (decorator, status) => {
        const updateInfo = { status, email: decorator.email };

        const res = await fetch(`https://xdecor.vercel.app/decorators/${decorator._id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateInfo)
        });

        const data = await res.json();

        if (data.modifiedCount) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Decorator status updated to ${status}.`,
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    const handleApproval = decorator => updateDecoratorStatus(decorator, "approved");
    const handleRejection = decorator => updateDecoratorStatus(decorator, "rejected");

    return (
        <div>
            <h2 className="text-4xl font-bold mb-4">
                Decorators Pending Approval: {decorators.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {decorators.map((decorator, index) => (
                            <tr key={decorator._id}>
                                <td>{index + 1}</td>
                                <td>{decorator.name}</td>
                                <td>{decorator.email}</td>
                                <td>{decorator.district}</td>

                                <td className={
                                    decorator.status === "approved"
                                        ? "text-green-600"
                                        : "text-red-500"
                                }>
                                    {decorator.status}
                                </td>

                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleApproval(decorator)}
                                        className="btn btn-success text-white"
                                    >
                                        <FaUserCheck />
                                    </button>

                                    <button
                                        onClick={() => handleRejection(decorator)}
                                        className="btn btn-warning"
                                    >
                                        <IoPersonRemoveSharp />
                                    </button>

    <button
  onClick={() => handleDelete(decorator)}
  className="btn btn-error text-white"
>
  <FaTrashCan />
</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ApproveDecorator;

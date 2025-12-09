import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const ServiceDetails = () => {
    const data = useLoaderData();
    const service = data.result;
    const navigate = useNavigate();

    if (!service) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center text-red-500">
                Service not found.
            </div>
        );
    }

    const handleBookNow = () => {
        // Navigate to bookings page with service id
        navigate(`/bookings/${service._id}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-6">
                <img 
                    src={service.image || "https://via.placeholder.com/600x400"} 
                    alt={service.serviceName} 
                    className="w-full h-[400px] object-cover" 
                />
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{service.serviceName}</h1>
                <p className="text-gray-600 mb-2"><strong>Type:</strong> {service.serviceType}</p>
                <p className="text-gray-600 mb-2"><strong>Price:</strong> ${service.price}</p>
                <p className="text-gray-800">{service.description}</p>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
                <img 
                    src={service.providerPhoto || "https://via.placeholder.com/100"} 
                    alt={service.providerName} 
                    className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                    <h2 className="text-xl font-semibold">{service.providerName}</h2>
                    <p className="text-gray-600">{service.providerEmail}</p>
                </div>
            </div>

            <button
                onClick={handleBookNow}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Book Now
            </button>
        </div>
    );
};

export default ServiceDetails;

import React, { useState } from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router';
import { 
  Star, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  MapPin, 
  Calendar,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';

const ServiceDetails = () => {
    const data = useLoaderData();
    const service = data.result;
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    if (!service) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-center text-red-500">
                Service not found.
            </div>
        );
    }



    // Mock reviews data
    const reviews = [
        {
            id: 1,
            user: 'John Doe',
            avatar: '   https://i.pravatar.cc/150?u=johndoe',
            rating: 5,
            date: '2024-01-15',
            comment: 'Excellent service! Highly recommended.',
            helpful: 12
        },
        {
            id: 2,
            user: 'Jane Smith',
            avatar: '   https://i.pravatar.cc/150?u=janesmith',
            rating: 4,
            date: '2024-01-10',
            comment: 'Good quality service, timely delivery.',
            helpful: 5
        }
    ];

    // Mock multiple images
    const serviceImages = service.images || [
        service.image || "https://via.placeholder.com/800x500",

    ];

    const handleBookNow = () => {
        navigate(`/bookings/${service._id}`);
    };


    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star 
                key={i} 
                className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                <Link to="/services" className="hover:text-blue-500">Services</Link>
                <span className="mx-2">/</span>
                <Link to={`/services?category=${service.serviceType}`} className="hover:text-blue-500">
                    {service.serviceType}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{service.serviceName}</span>
            </div>

            {/* Image Gallery */}
            <div className="relative mb-8 group">
                <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
                    <img 
                        src={serviceImages[currentImageIndex]} 
                        alt={`${service.serviceName} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                    />

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">{service.serviceName}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex">{renderStars(service.rating || 4.5)}</div>
                                <span className="text-gray-600">({reviews.length} reviews)</span>
                            </div>
                            <span className="px-3 py-1 bg-green-500 text-green-800 rounded-full text-sm">
                                {service.serviceType}
                            </span>
                        </div>
                    </div>

                    {/* Overview/Description Section */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                        <div className=" p-6 rounded-xl shadow-sm border">
                            <p className="text-gray-700 leading-relaxed">{service.description}</p>
                        </div>
                    </section>

                    {/* Key Information/Specs/Rules Section */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Key Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className=" p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <DollarSign className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium">Pricing</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">${service.price}</p>
                                <p className="text-sm text-gray-600">All inclusive pricing</p>
                            </div>

                            <div className=" p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="w-5 h-5 text-green-500" />
                                    <span className="font-medium">Duration</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">2-3 Hours</p>
                                <p className="text-sm text-gray-600">Estimated completion time</p>
                            </div>

                            <div className=" p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    <span className="font-medium">Capacity</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">Up to 10</p>
                                <p className="text-sm text-gray-600">People served simultaneously</p>
                            </div>

                            <div className=" p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <Shield className="w-5 h-5 text-orange-500" />
                                    <span className="font-medium">Safety</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">Certified</p>
                                <p className="text-sm text-gray-600">Verified safety standards</p>
                            </div>
                        </div>

                        {/* Rules & Requirements */}
                        <div className="mt-6  p-6 rounded-xl shadow-sm border">
                            <h3 className="text-lg font-semibold mb-3">Requirements & Rules</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Advance booking required (minimum 24 hours)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Valid ID proof mandatory</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Cancellation allowed up to 12 hours before service</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>50% advance payment required</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Customer Reviews</h2>

                        </div>

                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className=" p-6 rounded-xl shadow-sm border">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={review.avatar} 
                                                alt={review.user}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{review.user}</h4>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex">{renderStars(review.rating)}</div>
                                                    <span className="text-gray-500 text-sm">{review.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-3">{review.comment}</p>
                                    <div className="text-sm text-gray-500">
                                        {review.helpful} people found this helpful
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1">
                    {/* Provider Card */}
                    <div className="sticky top-6">
                        <div className=" rounded-xl shadow-lg border p-6 mb-6">
                            <div className="flex items-center gap-4 mb-6">
                                <img 
                                    src={service.image || "https://i.pravatar.cc/150?u=${service.providerId}"} 
                                    alt={service.providerName}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                                />
                                <div>
                                    <h2 className="text-xl font-bold">{service.providerName}</h2>
                                    <p className="text-gray-600">{service.providerEmail}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {renderStars(4.8)}
                                        <span className="text-gray-600 ml-1">4.8</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <span>Available in your area</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span>Same day booking available</span>
                                </div>
                            </div>

                            <div className=" p-4 rounded-lg mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">Total Price</span>
                                    <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                                </div>
                                <p className="text-sm text-gray-600">Inclusive of all taxes and fees</p>
                            </div>

                            <button
                                onClick={handleBookNow}
                                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg shadow-lg"
                            >
                                Book Now
                            </button>


                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default ServiceDetails;
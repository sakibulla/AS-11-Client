import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import Coverage from '../../Coverage/Coverage';
import ServiceCard from '../../../pages/ServiceCard/ServiceCard';
import axios from 'axios';
import { Link } from "react-router";

import { 
  FaStar, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaCreditCard, 
  FaHeadset,
  FaQuoteLeft,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa';
import { 
  GiPartyPopper, 
  GiFlowerPot, 
  GiBalloons,
  GiCrystalBall
} from 'react-icons/gi';
import { MdCorporateFare, MdCake } from 'react-icons/md';

const Home = () => {
  const [topServices, setTopServices] = useState([]);
  const [topDecorators, setTopDecorators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, decoratorsRes] = await Promise.all([
          axios.get('https://xdecor.vercel.app/services'),
          axios.get('https://xdecor.vercel.app/decorators?status=approved')
        ]);

        setTopServices(servicesRes.data.slice(0, 4));
        setTopDecorators(decoratorsRes.data.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed with email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  if (loading) {
    return (
      <div className="min-h-screen  to-white flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <GiCrystalBall className="text-2xl text-purple-600 animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-gray-600 text-lg font-medium animate-pulse">
          Loading amazing designs...
        </p>
      </div>
    );
  }

  const categories = [
    { icon: <GiPartyPopper />, label: 'Weddings', color: 'from-purple-500 to-pink-500' },
    { icon: <MdCorporateFare />, label: 'Corporate', color: 'from-blue-500 to-cyan-500' },
    { icon: <MdCake />, label: 'Birthday', color: 'from-orange-500 to-yellow-500' },
    { icon: <GiFlowerPot />, label: 'Floral', color: 'from-green-500 to-emerald-500' },
    { icon: <GiBalloons />, label: 'Balloons', color: 'from-red-500 to-pink-500' },
  ];

  const features = [
    {
      icon: <FaCalendarAlt />,
      title: 'Easy Booking',
      description: 'Book premium decoration services in minutes with our intuitive platform',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Verified Decorators',
      description: 'All professionals are thoroughly vetted, certified, and insured',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: <FaCreditCard />,
      title: 'Secure Payments',
      description: 'Your payments are protected with bank-level encryption',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for any questions or issues',
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  const testimonials = [
    {
      text: 'XDecor transformed our wedding venue into a fairy tale! Their attention to detail and professionalism exceeded all expectations.',
      author: 'Sarah Johnson',
      role: 'Wedding Client',
      rating: 5
    },
    {
      text: 'The corporate event setup was flawless. The team delivered beyond what we imagined. Highly recommended!',
      author: 'Michael Chen',
      role: 'Corporate Event Manager',
      rating: 5
    },
    {
      text: 'Birthday party decorations were stunning! Quick setup and beautiful results. Will definitely book again.',
      author: 'Emily Rodriguez',
      role: 'Event Host',
      rating: 5
    }
  ];

  return (
    <div className=" from-gray-50 to-white">
      {/* Top Services Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-500 text-purple-900 rounded-full text-sm font-semibold mb-4">
              Premium Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular decoration services handpicked by thousands of satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topServices.map((service) => (
              <div key={service._id} className="group transform transition-all duration-300 hover:-translate-y-2">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
<Link
  to="/services"
  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
>
  View All Services
  <FaArrowRight className="ml-2" />
</Link>
          </div>
        </div>
      </section>

      {/* Banner & Coverage */}
      <Banner />
      <Coverage />

      {/* Top Decorators Section */}
      <section className="py-16 md:py-24  from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-400 to-blue-400 text-purple-700 rounded-full text-sm font-semibold mb-4">
              Expert Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Top Rated <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Decorators</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our talented team of certified professionals ready to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {topDecorators.map((decorator, index) => (
              <div 
                key={decorator._id}
                className=" rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative group"
              >
                {/* Ranking Badge */}
                <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-700 to-amber-500' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                  index === 2 ? 'bg-gradient-to-r from-amber-600 to-orange-500' :
                  'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}>
                  #{index + 1}
                </div>

                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <img
                      src={decorator.photoURL || `https://i.pravatar.cc/150?u=${decorator._id}`}
                      alt={decorator.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <FaCheck className="text-white text-xs" />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{decorator.name}</h3>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-purple-600 text-sm font-semibold rounded-full mb-3">
                    {decorator.specialty || 'General Decorator'}
                  </span>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg ${
                          i < (decorator.rating || 4) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-700 font-semibold">
                      {decorator.rating || 4.5}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">XDecor</span> Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience seamless event decoration with our premium features and dedicated support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative  rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.gradient} rounded-t-2xl`}></div>
                
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-2xl text-white">{feature.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-purple-700 rounded-full text-sm font-semibold mb-4">
              Popular Categories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Decorate Any <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Occasion</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect decoration style for every special moment in your life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative bg-purple rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className={`relative z-10 w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-3xl text-white">{category.icon}</div>
                </div>

                <h3 className="relative z-10 text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                  {category.label}
                </h3>

                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">1,200+</div>
              <div className="text-lg text-purple-200 font-medium">Successful Bookings</div>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">450+</div>
              <div className="text-lg text-purple-200 font-medium">Expert Decorators</div>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">98%</div>
              <div className="text-lg text-purple-200 font-medium">Client Satisfaction</div>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">4.9</div>
              <div className="text-lg text-purple-200 font-medium">Average Rating</div>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-700 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Clients</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who transformed their events with XDecor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="e rounded-2xl p-8 shadow-xl border border-gray-100 relative"
              >
                <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <FaQuoteLeft className="text-white text-sm" />
                </div>
                
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                
                <p className="text-gray-600 italic text-lg leading-relaxed mb-8">
                  "{testimonial.text}"
                </p>
                
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-purple-600 text-sm font-medium">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
            
            <div className="relative z-10 text-center">
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
                Stay Updated
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Transform Your Next Event
              </h2>
              
              <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                Subscribe to get the latest decoration trends, exclusive offers, and expert tips delivered to your inbox
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 font-bold rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
              
              <p className="text-sm text-purple-200 mt-4">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
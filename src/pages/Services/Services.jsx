import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import ServiceCard from "../ServiceCard/ServiceCard";
import { CiSearch } from "react-icons/ci";
import { Typewriter } from "react-simple-typewriter";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

const Services = () => {
  const data = useLoaderData() || [];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", ...Array.from(new Set(data.map((service) => service.serviceType)))];

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setFiltered(data);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [data]);

  // Search and filter
  useEffect(() => {
    if (!data.length) return;
    setLoading(true);

    const delay = setTimeout(() => {
      let filteredData = data;

      if (search) {
        filteredData = filteredData.filter((service) =>
          service.serviceName.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category !== "All") {
        filteredData = filteredData.filter((service) => service.serviceType === category);
      }

      if (minPrice !== "") {
        filteredData = filteredData.filter((service) => service.price >= Number(minPrice));
      }

      if (maxPrice !== "") {
        filteredData = filteredData.filter((service) => service.price <= Number(maxPrice));
      }

      setFiltered(filteredData);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, category, minPrice, maxPrice, data]);

  const featuredServices = data.slice(0, 5);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-70 mb-3"></div>
            <p className="text-gray-600 font-semibold text-lg">Loading...</p>
          </div>
        </div>
      )}

      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          <Typewriter
            words={["Explore Services", "Discover Options", "Find Your Perfect Service"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="text-gray-600 mt-1 text-lg">Check out our available services</p>
      </div>

      {!loading && featuredServices.length > 0 && (
        <div className="max-w-sm mx-auto mb-10">
          <Swiper
            effect="cards"
            grabCursor
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            modules={[EffectCards, Autoplay, Pagination]}
            className="mySwiper"
          >
            {featuredServices.map((service) => (
              <SwiperSlide
                key={service._id}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="w-full h-80 object-cover"
                />
                <p className="text-center mt-2 font-semibold">{service.serviceName}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-end gap-4 mb-8 w-full md:w-1/2 ml-auto">
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-lg shadow-sm flex-1 focus-within:ring-2 focus-within:ring-indigo-400">
          <CiSearch className="text-gray-400 text-xl mr-2" />
          <input
            type="text"
            placeholder="Search by Service Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none flex-1"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm w-24"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm w-24"
        />
      </div>

      {/* Service Cards */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.length > 0 ? (
            filtered.map((service) => <ServiceCard key={service._id} service={service} />)
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10 font-semibold">
              {search || category !== "All" || minPrice || maxPrice
                ? `No services found for the selected filters`
                : "No services found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;

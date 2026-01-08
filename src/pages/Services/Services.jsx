import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import ServiceCard from "../ServiceCard/ServiceCard";
import { CiSearch, CiFilter } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Typewriter } from "react-simple-typewriter";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

const Services = () => {
  const data = useLoaderData() || [];

  // Filters & search
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [location, setLocation] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get unique categories & locations
  const categories = ["All", ...Array.from(new Set(data.map(s => s.serviceType)))];
  const locations = ["All", ...Array.from(new Set(data.map(s => s.location || "Online").filter(Boolean)))];

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setFiltered(data);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [data]);

  // Filter & search logic
  useEffect(() => {
    if (!data.length) return;
    setLoading(true);

    const delay = setTimeout(() => {
      let filteredData = [...data];

      // Search filter
      if (search) {
        filteredData = filteredData.filter(
          s =>
            s.serviceName.toLowerCase().includes(search.toLowerCase()) ||
            s.description?.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Category filter
      if (category !== "All") {
        filteredData = filteredData.filter(s => s.serviceType === category);
      }

      // Price range
      if (priceRange.min !== "") {
        filteredData = filteredData.filter(s => s.price >= parseFloat(priceRange.min));
      }
      if (priceRange.max !== "") {
        filteredData = filteredData.filter(s => s.price <= parseFloat(priceRange.max));
      }

      // Rating
      if (rating > 0) {
        filteredData = filteredData.filter(s => s.rating >= rating);
      }

      // Location
      if (location && location !== "All") {
        filteredData = filteredData.filter(s => (s.location || "Online") === location);
      }

      // Sorting
      switch (sortBy) {
        case "price-low":
          filteredData.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredData.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredData.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "name":
          filteredData.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
          break;
        default:
          break;
      }

      setFiltered(filteredData);
      setCurrentPage(1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, category, priceRange, rating, sortBy, location, data]);

  // Pagination helpers
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset filters
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setPriceRange({ min: "", max: "" });
    setRating(0);
    setLocation("");
  };

  // Price stats
  const priceStats = data.length
    ? { min: Math.min(...data.map(s => s.price)), max: Math.max(...data.map(s => s.price)) }
    : { min: 0, max: 1000 };

  const featuredServices = data.slice(0, 5);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/80">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 mb-3"></div>
            <p className="text-gray-600 font-semibold text-lg">Loading...</p>
          </div>
        </div>
      )}

      {/* Heading */}
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
        <p className="text-gray-600 mt-1 text-lg">{filtered.length} services available</p>
      </div>

      {/* Featured Slider */}
      {!loading && featuredServices.length > 0 && (
        <div className="max-w-sm mx-auto mb-10">
          <Swiper
            effect="cards"
            grabCursor
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            modules={[EffectCards, Autoplay, Pagination]}
          >
            {featuredServices.map(s => (
              <SwiperSlide key={s._id} className="rounded-xl overflow-hidden shadow-lg">
                <img src={s.image} alt={s.serviceName} className="w-full h-80 object-cover" />
                <div className="p-4 bg-white">
                  <p className="text-center font-semibold text-lg">{s.serviceName}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-indigo-600 font-bold">${s.price}</span>
                    <span className="text-yellow-500">{s.rating?.toFixed(1) || "New"} ⭐</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Filters & Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="flex items-center border border-gray-300 px-4 py-3 rounded-lg shadow-sm flex-1 max-w-lg focus-within:ring-2 focus-within:ring-indigo-400">
            <CiSearch className="text-gray-400 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search services or descriptions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="outline-none flex-1 w-full"
            />
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm min-w-[180px]"
            >
              <option value="default">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
        >
          <CiFilter className="text-lg" />
          Advanced Filters
          {showAdvancedFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">Range: ${priceStats.min} - ${priceStats.max}</div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={rating}
                  onChange={e => setRating(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="font-semibold text-indigo-600 min-w-[40px]">{rating > 0 ? `⭐ ${rating}+` : "Any"}</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Reset */}
            <div className="md:col-span-2 lg:col-span-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      {!loading && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Showing {paginatedItems.length} of {filtered.length} services
          </p>
        </div>
      )}

      {/* Service Cards */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-8">
            {paginatedItems.length > 0 ? (
              paginatedItems.map(service => <ServiceCard key={service._id} service={service} />)
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10 font-semibold">
                {search || category !== "All" || rating > 0 || priceRange.min || priceRange.max
                  ? "No services found for the selected filters"
                  : "No services available"}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === i + 1 ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Services;

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const autoPlayInterval = useRef(null);
  const slideRefs = useRef([]);

  const slides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg",
      title: "Transform Your Space",
      subtitle: "Premium Home Decoration Services"
    },
    {
      id: 2,
      image: "https://thumbs.dreamstime.com/b/beautiful-new-home-exterior-clear-evening-provides-setting-luxurious-34711767.jpg",
      title: "Dream Home Designs",
      subtitle: "Custom Interior & Exterior Solutions"
    },
    {
      id: 3,
      image: "https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=",
      title: "Ceremony Excellence",
      subtitle: "Memorable Event Decorations"
    }
  ];

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isClient && isAutoPlaying && !isPaused) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
    } else if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isClient, isAutoPlaying, isPaused, slides.length]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
<div className="relative w-full overflow-hidden" style={{ height: '60vh' }}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={el => slideRefs.current[index] = el}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-110 pointer-events-none'
          }`}
          style={{
            transition: 'opacity 1s ease-out, transform 1.2s ease-out'
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>
          
          {/* Slide Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-0">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {slide.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-3xl text-white mb-8 drop-shadow-lg max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {slide.subtitle}
            </motion.p>
            <motion.a
              href="/services"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-[#F7C08A] to-[#E6A56F] text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Book Decoration Service</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>
      ))}

      {/* Controls */}
      {isClient && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 z-20">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAutoPlay}
              className={`p-2 rounded-full transition-all duration-300 ${
                isAutoPlaying 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}
              aria-label={isAutoPlaying ? "Auto-play enabled" : "Auto-play disabled"}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                {isAutoPlaying ? (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                )}
              </svg>
            </button>

            <button
              onClick={togglePause}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
              aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                {isPaused ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 group"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Progress Bar */}
      {isClient && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-10">
          <div 
            className="h-full bg-gradient-to-r from-[#F7C08A] to-[#E6A56F]"
            style={{
              width: isAutoPlaying && !isPaused ? '100%' : '0%',
              transition: isAutoPlaying && !isPaused ? 'width 5s linear' : 'none',
              animation: isAutoPlaying && !isPaused ? 'progress 5s linear infinite' : 'none'
            }}
          />
          <style jsx>{`
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}

      {/* Scroll Indicator */}
      {isClient && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Banner;
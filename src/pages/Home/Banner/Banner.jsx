import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className="relative">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
            >
                <div>
                    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg" />
                </div>
                <div>
                    <img src="https://thumbs.dreamstime.com/b/beautiful-new-home-exterior-clear-evening-provides-setting-luxurious-34711767.jpg" />
                </div>
                <div>
                    <img src="https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=" />
                </div>
            </Carousel>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-0">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Transform Your Space
                </motion.h1>
                <motion.p
                    className="text-lg md:text-2xl text-white mb-6 drop-shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    Premium Home & Ceremony Decoration Services
                </motion.p>
                <motion.a
                    href="/services"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#F7C08A] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl shadow-lg hover:bg-[#E6A56F] transition-colors duration-300"
                >
                    Book Decoration Service
                </motion.a>
            </div>
        </div>
    );
};

export default Banner;

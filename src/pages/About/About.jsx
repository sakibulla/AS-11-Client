import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">About StyleDecor</h1>
      <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
        StyleDecor is your one-stop solution for home and ceremony decoration services. 
        We bring professional decorators and curated packages to your doorstep, making your events unforgettable.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className=" shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            To provide seamless and smart decoration booking experiences, saving time and ensuring quality service for every client.
          </p>
        </div>

        <div className=" shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p>
            To be the leading home and ceremony decoration platform in Bangladesh, empowering local decorators and delighting clients with unforgettable experiences.
          </p>
        </div>

        <div className=" shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Professionalism & Reliability</li>
            <li>Innovation & Technology</li>
            <li>Client Satisfaction</li>
            <li>Support Local Talent</li>
          </ul>
        </div>

        <div className=" shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <p>
            With StyleDecor, you get a streamlined booking system, verified decorators, and real-time updates for your events. 
            We take the stress out of planning and make your celebration extraordinary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

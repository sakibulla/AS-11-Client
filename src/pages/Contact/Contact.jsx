import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: send data to server or email service
    console.log(formData);
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10">
        Have questions or want to book a service? Reach out to us and we will get back to you as soon as possible.
      </p>

      <div className="max-w-2xl mx-auto  shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="input input-bordered w-full"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
            rows={5}
            required
          ></textarea>

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>

        <div className="mt-8 space-y-3">
          <p><strong>Email:</strong> info@styledcor.com</p>
          <p><strong>Phone:</strong> +880 1234 567890</p>
          <p><strong>Address:</strong> House #12, Road #7, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

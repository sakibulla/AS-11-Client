import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await axios.get('https://xdecor.vercel.app/services');
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let photoURL = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const imageAPI_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;
        const imageRes = await axios.post(imageAPI_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        photoURL = imageRes.data.data.display_url;
      }

      const serviceData = {
        serviceName,
        serviceType,
        price: parseFloat(price),
        description,
      };
      if (photoURL) serviceData.image = photoURL;

      if (editingId) {
        await axios.put(`https://xdecor.vercel.app/services/${editingId}`, serviceData);
        alert('Service updated successfully!');
      } else {
        if (!photoURL) return alert('Please select an image');
        serviceData.image = photoURL;
        await axios.post('https://xdecor.vercel.app/services', serviceData);
        alert('Service added successfully!');
      }

      // Reset form
      setServiceName('');
      setServiceType('');
      setPrice('');
      setDescription('');
      setImageFile(null);
      setEditingId(null);
      fetchServices();
    } catch (error) {
      console.error(error);
      alert('Error saving service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await axios.delete(`https://xdecor.vercel.app/services/${id}`);
      alert('Service deleted');
      fetchServices();
    } catch (error) {
      console.error(error);
      alert('Error deleting service');
    }
  };

  const handleEdit = (service) => {
    setServiceName(service.serviceName);
    setServiceType(service.serviceType);
    setPrice(service.price);
    setDescription(service.description);
    setEditingId(service._id);
    setImageFile(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      {/* Form Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{editingId ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Service Type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {loading ? 'Saving...' : editingId ? 'Update Service' : 'Add Service'}
          </button>
        </form>
      </div>

      {/* Services List */}
<h2 className="text-2xl font-bold mb-6 text-gray-800">Existing Services</h2>
{services.length === 0 ? (
  <p className="text-gray-500">No services found.</p>
) : (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {services.map((service) => (
      <div
        key={service._id}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
      >
        <img src={service.image} alt={service.serviceName} className="w-full h-40 object-cover" />
        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{service.serviceName}</h3>
            <p className="text-gray-500">{service.serviceType} - ${service.price}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleEdit(service)}
              className="flex-1 bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(service._id)}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default AddService;

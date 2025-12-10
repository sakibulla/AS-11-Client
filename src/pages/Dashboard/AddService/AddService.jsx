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
  const [editingId, setEditingId] = useState(null); // Track which service is being edited

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:3000/services');
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

      // Only upload new image if a file is selected
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
        // Update existing service
        await axios.put(`http://localhost:3000/services/${editingId}`, serviceData);
        alert('Service updated successfully!');
      } else {
        // Add new service
        if (!photoURL) return alert('Please select an image');
        serviceData.image = photoURL;
        await axios.post('http://localhost:3000/services', serviceData);
        alert('Service added successfully!');
      }

      // Reset form
      setServiceName('');
      setServiceType('');
      setPrice('');
      setDescription('');
      setImageFile(null);
      setEditingId(null);

      fetchServices(); // Refresh list
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
      await axios.delete(`http://localhost:3000/services/${id}`);
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
    setImageFile(null); // User can optionally upload a new image
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Service' : 'Add Service'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Service Type"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : editingId ? 'Update Service' : 'Add Service'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Services</h2>
      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service._id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{service.serviceName}</h3>
                  <p>{service.serviceType} - ${service.price}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddService;

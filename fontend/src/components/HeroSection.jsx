import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function CustomerInfoCard({ price = 13000 }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    price: price,
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.name || !formData.phone || !formData.whatsapp) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to backend
      await axios.post('http://127.0.0.1:8004/api/orders/', formData);

      // Store to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = [...existingOrders, formData];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      alert("Order submitted successfully!");

      // Reset and close form
      setFormData({
        name: '',
        phone: '',
        whatsapp: '',
        price: price,
        comment: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full md:w-80 bg-white border rounded-lg shadow-md p-4 relative">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Contact & Order Info</h3>

      {/* Location Info */}
      <div className="flex items-center gap-2 mb-3 text-gray-700">
        <FaMapMarkerAlt className="text-blue-500" />
        <span>Mbeya - MUST (Ikuti)</span>
      </div>

      {/* Phone Numbers */}
      <div className="flex items-center gap-2 mb-3 text-gray-700">
        <FaPhoneAlt className="text-green-600" />
        <div className="flex flex-col text-sm">
          <span>+255 673 373 521</span>
          <span>+255 675 436 928</span>
        </div>
      </div>

      {/* Order Button */}
      <button
        onClick={() => setShowForm(true)}
        className="mt-2 w-full px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
      >
        Make an Order
      </button>

      {/* Order Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Form</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="whatsapp"
                placeholder="WhatsApp Number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price (editable)"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.price}
                onChange={handleChange}
              />
              <textarea
                name="comment"
                placeholder="Optional Comment"
                className="w-full border border-gray-300 p-2 rounded"
                rows="3"
                value={formData.comment}
                onChange={handleChange}
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded text-white ${
                    isSubmitting ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerInfoCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEye,
  FaPlusCircle,
  FaMinusCircle,
  FaShoppingCart,
  FaInfoCircle,
} from "react-icons/fa";
import CustomerInfoCard from "./HeroSection";

// Load all images
const importAll = (r) => r.keys().map(r);
const kattleImages = importAll(
  require.context("../assets/kattle", false, /\.(png|jpe?g|svg)$/)
);

function ProductCard({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [views, setViews] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);
  const [showOrdersModal, setShowOrdersModal] = useState(false);

  // Fetch orders from the backend
  useEffect(() => {
    const storedViews = localStorage.getItem("product_views") || 0;
    const newViews = parseInt(storedViews) + 1;
    localStorage.setItem("product_views", newViews);
    setViews(newViews);

    fetchOrders(); // Fetch orders on component mount
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8004/api/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const originalPrice = 15000;
  const discountedPrice = 13000;
  const discountPercent = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white w-full flex flex-col md:flex-row gap-6">
      {/* Images Section */}
      <div className="flex flex-1 gap-4 items-start">
        <div className="flex flex-col gap-3">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-14 h-14 object-cover rounded-md cursor-pointer border-2 ${
                currentIndex === index ? "border-gray-600" : "border-transparent"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] overflow-hidden group rounded-lg border">
          <img
            src={images[currentIndex]}
            alt={`Main View ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 cursor-zoom-in"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-start">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Product Description</h2>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-blue-700 font-semibold text-xl">
            Tsh {discountedPrice.toLocaleString()}/=
          </span>
          <span className="line-through text-gray-400 text-sm">
            Tsh {originalPrice.toLocaleString()}/=
          </span>
          <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded font-medium">
            {discountPercent}% OFF
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Travel Electric Kettle Tea Coffee 0.8L Stainless Steel Portable Water Boiler Pot
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <FaEye className="mr-1" />
          {views} views
        </div>

        <div className="flex items-center gap-3 mt-3">
          <span className="font-medium text-gray-700">Quantity:</span>
          <FaMinusCircle onClick={handleDecrease} className="text-red-500 text-xl cursor-pointer" />
          <span className="w-6 text-center">{quantity}</span>
          <FaPlusCircle onClick={handleIncrease} className="text-green-600 text-xl cursor-pointer" />
        </div>

        <div className="mt-24 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-100 transition">
              <FaInfoCircle className="text-blue-600" />
              Details
            </button>

            <button
              onClick={() => setShowOrdersModal(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              <FaShoppingCart className="text-blue-600" />
              Orders ({orders.length})
            </button>
          </div>
        </div>
      </div>

      {/* Orders Modal */}
      {showOrdersModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg shadow-lg overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders yet.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {orders.map((order, index) => (
                  <li key={index} className="border rounded p-3 shadow-sm">
                    <p><strong>Name:</strong> {order.name}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>WhatsApp:</strong> {order.whatsapp}</p>
                    <p><strong>Price:</strong> {order.price}</p>
                    <p><strong>Comment:</strong> {order.comment || "None"}</p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowOrdersModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductSection() {
  return (
    <section className="p-6 bg-gray-50 min-h-screen flex flex-col md:flex-row gap-6 justify-center items-start">
      <div className="flex-1">
        <ProductCard images={kattleImages} />
      </div>
      <div className="w-full md:w-80">
        <CustomerInfoCard />
      </div>
    </section>
  );
}

export default ProductSection;

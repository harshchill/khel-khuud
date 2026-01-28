"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  ChevronLeft,
  Info,
  Edit2,
  X,
  Check,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

// --- Mock Data ---
const INITIAL_DETAILS = {
  venueName: "Smash Arena Sports Complex",
  location: "Indore, Madhya Pradesh",
  courtName: "Badminton Court 1 (Synthetic)",
  sport: "Badminton",
  date: "2024-10-12", // Changed to YYYY-MM-DD for input compatibility
  time: "18:00", // Start time in 24h format
  duration: 2, // Duration in hours
  pricePerHour: 400,
  tax: 40,
  images: [
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800",
  ],
  description:
    "This is a BWF-standard synthetic flooring badminton court designed for professional play. Features anti-skid coating and high-intensity LED lighting.",
  rules: [
    "Non-marking shoes are mandatory.",
    "Max 4 players per court.",
    "Bring your own rackets/shuttles.",
  ],
};

// Available time slots for the dropdown
const AVAILABLE_SLOTS = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export default function BookingSummaryPage() {
  // State
  const [booking, setBooking] = useState(INITIAL_DETAILS);
  const [activeImage, setActiveImage] = useState(INITIAL_DETAILS.images[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(INITIAL_DETAILS.date);
  const [tempTime, setTempTime] = useState(INITIAL_DETAILS.time);

  // Calculations
  const subtotal = booking.pricePerHour * booking.duration;
  const total = subtotal + booking.tax;

  // Formatting helpers
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTimeRange = (startTime, duration) => {
    const start = parseInt(startTime.split(":")[0]);
    const end = start + duration;
    const format = (h) =>
      h >= 12 ? `${h > 12 ? h - 12 : h}:00 PM` : `${h}:00 AM`;
    return `${format(start)} - ${format(end)}`;
  };

  const handleSaveChanges = () => {
    setBooking({ ...booking, date: tempDate, time: tempTime });
    setIsEditing(false);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Payment Gateway Opening...");
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen  bg-gray-50 py-10 px-4 sm:px-6">
      <Navbar />
      <div className="max-w-6xl mt-25 mx-auto">
        {/* Header / Back Link */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Confirm Your Booking
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT SIDE: GALLERY & DESCRIPTION --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="h-80 w-full mb-4 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={activeImage}
                  alt="Court View"
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {booking.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all 
                      ${activeImage === img ? "border-blue-600 ring-2 ring-blue-100" : "border-transparent hover:border-gray-300"}`}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {booking.courtName}
                  </h2>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                    <MapPin size={16} /> {booking.venueName}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
                  {booking.sport}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                About this Court
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {booking.description}
              </p>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Rules & Amenities
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {booking.rules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle
                      size={16}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- RIGHT SIDE: BOOKING DETAILS (EDITABLE) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Booking Details
                </h3>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Editable Date & Time Section */}
              <div
                className={`space-y-4 mb-6 transition-all ${isEditing ? "bg-blue-50 p-4 rounded-xl border border-blue-100" : ""}`}
              >
                {/* Date Row */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-transparent">
                  <div className="p-2 bg-white rounded-md shadow-sm text-blue-600">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Date</p>
                    {isEditing ? (
                      <input
                        type="date"
                        value={tempDate}
                        onChange={(e) => setTempDate(e.target.value)}
                        className="w-full mt-1 p-1 text-sm border text-black border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <p className="text-sm font-bold text-gray-900">
                        {formatDate(booking.date)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Time Row */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-transparent">
                  <div className="p-2 bg-white rounded-md shadow-sm text-blue-600">
                    <Clock size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">
                      Time ({booking.duration} Hours)
                    </p>
                    {isEditing ? (
                      <select
                        value={tempTime}
                        onChange={(e) => setTempTime(e.target.value)}
                        className="w-full mt-1 p-1 text-black text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        {AVAILABLE_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {formatTimeRange(slot, booking.duration)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm font-bold text-gray-900">
                        {formatTimeRange(booking.time, booking.duration)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Save Button (Only visible when editing) */}
                {isEditing && (
                  <button
                    onClick={handleSaveChanges}
                    className="w-full mt-2 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                  >
                    <Check size={14} /> Update Booking
                  </button>
                )}
              </div>

              {/* Price Calculation */}
              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Price ({booking.duration} Hours)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Convenience Fee</span>
                  <span>₹{booking.tax}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-bold text-gray-900">
                    Total Payable
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || isEditing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </button>

              <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                <Info size={12} /> Secure Payment processed by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Navbar from "../components/Navbar";
import React, { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

// --- Mock Data ---
const MOCK_VENUES = [
  {
    id: 1,
    name: "Smash Arena Complex",
    location: "Indore, MP",
    rating: 4.8,
    price: 400,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600",
    sports: ["Badminton", "Table Tennis"],
  },
  {
    id: 2,
    name: "Urban Turf Ground",
    location: "Bhopal, MP",
    rating: 4.5,
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=600",
    sports: ["Cricket", "Football"],
  },
  {
    id: 3,
    name: "City Sports Club",
    location: "Mumbai, MH",
    rating: 4.2,
    price: 800,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    sports: ["Tennis", "Swimming"],
  },
  {
    id: 4,
    name: "Pro Padel Court",
    location: "Pune, MH",
    rating: 4.9,
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1620164627447-e074d08b3e80?auto=format&fit=crop&q=80&w=600",
    sports: ["Tennis"],
  },
  {
    id: 5,
    name: "Downtown Badminton",
    location: "Indore, MP",
    rating: 4.0,
    price: 350,
    image:
      "https://images.unsplash.com/photo-1613917904797-2808c1d5332c?auto=format&fit=crop&q=80&w=600",
    sports: ["Badminton"],
  },
  {
    id: 6,
    name: "Galaxy Football Turf",
    location: "Delhi, NCR",
    rating: 4.6,
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=600",
    sports: ["Football"],
  },
];


// --- Components ---

const VenueCard = ({ venue }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
    <div className="relative h-48 overflow-hidden">
      <img
        src={venue.image}
        alt={venue.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
        <Star size={14} className="text-yellow-400 fill-yellow-400" />
        <span className="text-xs font-bold">{venue.rating}</span>
      </div>
    </div>

    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg text-gray-900 truncate">
            {venue.name}
          </h3>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <MapPin size={14} /> {venue.location}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {venue.sports.map((sport) => (
          <span
            key={sport}
            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
          >
            {sport}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div>
          <span className="text-gray-400 text-xs">Starts from</span>
          <p className="text-lg font-bold text-gray-900">
            ₹{venue.price}
            <span className="text-sm font-normal text-gray-500">/hr</span>
          </p>
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
          Book
        </button>
      </div>
    </div>
  </div>
);

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);

  const filteredVenues = MOCK_VENUES.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSports.length === 0 ||
      venue.sports.some((s) => selectedSports.includes(s));
    return matchesSearch && matchesSport;
  });

  const toggleSport = (sport) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter((s) => s !== sport));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  return (
    <div className="min-h-screen  bg-white">
      <Navbar/>

      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-35">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- LEFT SIDEBAR: FILTERS --- */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6  rounded-xl shadow-sm border border-gray-200 sticky top-50 right-5">
              <div className="flex items-center gap-2 mb-6 text-gray-900">
                <Filter size={20} />
                <h2 className="font-bold text-lg">Filters</h2>
              </div>

              {/* Sport Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  Sport
                </h3>
                <div className="space-y-2">
                  {[
                    "Badminton",
                    "Football",
                    "Cricket",
                    "Tennis",
                    "Swimming",
                  ].map((sport) => (
                    <label
                      key={sport}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                        ${selectedSports.includes(sport) ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white group-hover:border-blue-400"}`}
                      >
                        {selectedSports.includes(sport) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedSports.includes(sport)}
                        onChange={() => toggleSport(sport)}
                      />
                      <span
                        className={`text-sm ${selectedSports.includes(sport) ? "text-blue-600 font-medium" : "text-gray-600"}`}
                      >
                        {sport}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range (Visual Only) */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  Price Range
                </h3>
                <input
                  type="range"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹0</span>
                  <span>₹2000+</span>
                </div>
              </div>

              <button className="w-full py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition">
                Reset Filters
              </button>
            </div>
          </aside>

          {/* --- RIGHT SIDE: MAIN CONTENT --- */}
          <main className="flex-1">
            {/* Top Bar: Search & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h1 className="text-xl font-bold text-gray-900">
                Showing {filteredVenues.length} Venues
              </h1>

              <div className="relative w-full sm:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400 " />
                </div>
                <input
                  type="text"
                  placeholder="Search venues or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border bg-white text-black  border-gray-300 rounded-2xl placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Venue Grid */}
            {filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">
                  No venues found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSports([]);
                  }}
                  className="mt-2 text-blue-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>

                <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-medium">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium">
                  3
                </button>
                <span className="text-gray-400">...</span>
                <button className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium">
                  8
                </button>

                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

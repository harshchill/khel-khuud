"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle,
  XCircle,
  ChevronRight,
  Loader,
  AlertCircle,
  Clock,
} from "lucide-react";
import { getPendingVenues, updateVenueApprovalStatus } from "@/app/actions/venues";

export default function AdminRequestsPage() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      setLoading(true);
      const data = await getPendingVenues();
      setVenues(data);
      if (data.length > 0) {
        setSelectedVenue(data[0]);
      }
    } catch (err) {
      setError("Failed to load pending venues");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedVenue) return;
    await updateStatus("APPROVED");
  };

  const handleReject = async () => {
    if (!selectedVenue) return;
    await updateStatus("REJECTED");
  };

  const updateStatus = async (status) => {
    try {
      setUpdating(true);
      const result = await updateVenueApprovalStatus(selectedVenue.id, status);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Remove updated venue from list
      const updatedVenues = venues.filter((v) => v.id !== selectedVenue.id);
      setVenues(updatedVenues);

      // Select next venue
      if (updatedVenues.length > 0) {
        setSelectedVenue(updatedVenues[0]);
      } else {
        setSelectedVenue(null);
      }
    } catch (err) {
      setError("Failed to update venue status");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="h-8 w-8 text-cyan-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Venue Approval Requests
          </h1>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <Loader className="h-8 w-8 text-cyan-600 animate-spin" />
          </div>
        ) : venues.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 opacity-50" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              All Caught Up!
            </h2>
            <p className="text-gray-600">No pending venue requests at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-96">
            {/* Left Column - Venue List */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-blue-50">
                <p className="text-sm font-medium text-gray-700">
                  Pending Requests ({venues.length})
                </p>
              </div>

              <div className="flex-1 overflow-y-auto">
                {venues.map((venue) => (
                  <button
                    key={venue.id}
                    onClick={() => setSelectedVenue(venue)}
                    className={`w-full px-6 py-4 border-b border-gray-100 text-left transition-all hover:bg-cyan-50 flex items-center justify-between ${
                      selectedVenue?.id === venue.id
                        ? "bg-cyan-100 border-l-4 border-l-cyan-600"
                        : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {venue.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {venue.city}
                      </p>
                    </div>
                    {selectedVenue?.id === venue.id && (
                      <ChevronRight className="h-5 w-5 text-cyan-600 ml-2 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Venue Details */}
            {selectedVenue && (
              <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-blue-50 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-cyan-600" />
                  <p className="text-sm font-medium text-gray-700">
                    Request Details
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {/* Venue Info */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedVenue.name}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm">
                        {selectedVenue.address}, {selectedVenue.city}
                      </p>
                    </div>

                    {selectedVenue.description && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-700">
                          {selectedVenue.description}
                        </p>
                      </div>
                    )}

                    {/* Images */}
                    {selectedVenue.images && selectedVenue.images.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Venue Images
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedVenue.images.slice(0, 4).map((img, idx) => (
                            <div
                              key={idx}
                              className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
                            >
                              <img
                                src={img}
                                alt={`Venue ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Courts Section */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-cyan-600" />
                      Courts ({selectedVenue.courts.length})
                    </h3>
                    <div className="space-y-3">
                      {selectedVenue.courts.map((court) => (
                        <div
                          key={court.id}
                          className="bg-gray-50 rounded-lg p-4 flex items-between justify-between"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{court.name}</p>
                            <p className="text-sm text-gray-600">
                              {court.sportType}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Owner Info */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Owner Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{selectedVenue.owner.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a
                          href={`mailto:${selectedVenue.owner.email}`}
                          className="text-cyan-600 hover:underline"
                        >
                          {selectedVenue.owner.email}
                        </a>
                      </div>
                      {selectedVenue.owner.phone && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <a
                            href={`tel:${selectedVenue.owner.phone}`}
                            className="text-cyan-600 hover:underline"
                          >
                            {selectedVenue.owner.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Request Metadata */}
                  <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                    <p>
                      Submitted on{" "}
                      {new Date(selectedVenue.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
                  <button
                    onClick={handleReject}
                    disabled={updating}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-red-300 bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={updating}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                    Approve
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

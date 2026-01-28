"use server";

import { auth } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function getPendingVenues() {
  try {
    const venues = await prisma.venue.findMany({
      where: { isApproved: "PENDING" },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        courts: {
          select: {
            id: true,
            name: true,
            sportType: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return venues;
  } catch (error) {
    console.error("Error fetching pending venues:", error);
    throw error;
  }
}

export async function updateVenueApprovalStatus(venueId, status) {
  if (!["APPROVED", "REJECTED"].includes(status)) {
    return { error: "Invalid status" };
  }

  try {
    const venue = await prisma.venue.update({
      where: { id: venueId },
      data: { isApproved: status },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return { success: true, venue };
  } catch (error) {
    console.error("Error updating venue approval status:", error);
    return { error: "Failed to update venue status" };
  }
}

// Fetch dashboard stats for venue owner
export async function getDashboardStats() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  try {
    // Get all venues for this owner
    const venues = await prisma.venue.findMany({
      where: { ownerId: userId },
      include: {
        courts: true,
      },
    });

    const venueCount = venues.length;

    // Get all bookings and payments for this owner's venues
    const bookings = await prisma.booking.findMany({
      where: {
        court: {
          venue: {
            ownerId: userId,
          },
        },
      },
      include: {
        payment: true,
        court: {
          include: {
            venue: true,
          },
        },
        user: true,
      },
    });

    // Calculate total revenue (completed payments only)
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        status: "COMPLETED",
        booking: {
          court: {
            venue: {
              ownerId: userId,
            },
          },
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalEarnings = totalRevenue._sum.amount || 0;

    // Get unique customers (new members)
    const uniqueCustomers = new Set(bookings.map((b) => b.userId)).size;

    // Get revenue by day (last 7 days)
    const last7Days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      last7Days.push(date);
    }

    const revenueByDay = await Promise.all(
      last7Days.map(async (date) => {
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        const dayRevenue = await prisma.payment.aggregate({
          where: {
            status: "COMPLETED",
            createdAt: {
              gte: dayStart,
              lte: dayEnd,
            },
            booking: {
              court: {
                venue: {
                  ownerId: userId,
                },
              },
            },
          },
          _sum: {
            amount: true,
          },
        });

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return {
          name: dayNames[date.getDay()],
          rev: Number(dayRevenue._sum.amount || 0),
        };
      })
    );

    // Get top performers (customers who booked most)
    const bookingsByCustomer = {};
    bookings.forEach((booking) => {
      if (!bookingsByCustomer[booking.userId]) {
        bookingsByCustomer[booking.userId] = {
          name: booking.user.name,
          sessions: 0,
          totalSpend: 0,
        };
      }
      bookingsByCustomer[booking.userId].sessions += 1;
      if (booking.payment?.status === "COMPLETED") {
        bookingsByCustomer[booking.userId].totalSpend += Number(
          booking.payment.amount
        );
      }
    });

    const topPerformers = Object.values(bookingsByCustomer)
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 3)
      .map((p, index) => ({
        ...p,
        spend: `₹${p.totalSpend.toLocaleString()}`,
        color: ["bg-cyan-500", "bg-violet-500", "bg-emerald-500"][index],
      }));

    // Find top venue by bookings
    const venueBookingCount = {};
    bookings.forEach((booking) => {
      const venueName = booking.court.venue.name;
      venueBookingCount[venueName] = (venueBookingCount[venueName] || 0) + 1;
    });
    const topVenue =
      Object.entries(venueBookingCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";

    return {
      stats: [
        {
          label: "Total Revenue",
          value: `₹${Number(totalEarnings).toLocaleString()}`,
          icon: "Wallet",
          color: "text-cyan-500",
        },
        {
          label: "Active Venues",
          value: venueCount.toString(),
          icon: "Zap",
          color: "text-indigo-500",
        },
        {
          label: "New Members",
          value: uniqueCustomers.toString(),
          icon: "Users",
          color: "text-emerald-500",
        },
        {
          label: "Top Venue",
          value: topVenue,
          icon: "Trophy",
          color: "text-orange-500",
        },
      ],
      revenueData: revenueByDay,
      topPerformers: topPerformers,
    };
  } catch (error) {
    console.error("Dashboard error:", error);
    return { error: "Failed to fetch dashboard data" };
  }
}

// Add venue
export async function addVenueAction(formData) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "OWNER") {
    return { error: "Unauthorized" };
  }

  try {
    const venue = await prisma.venue.create({
      data: {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        images: formData.images || [],
        ownerId: session.user.id,
      },
    });

    return { success: true, venue };
  } catch (error) {
    console.error("Add venue error:", error);
    return { error: "Failed to add venue" };
  }
}

import prisma from "@/lib/prisma";
import {
  Users,
  UserCog,
  Building2,
  CalendarCheck,
  BarChart3,
  PieChart,
} from "lucide-react";

export default async function AdminDashboardPage() {
  // Data fetching
  const [customerCount, ownerCount, adminCount, venueCount, bookingCount] =
    await Promise.all([
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.user.count({ where: { role: "OWNER" } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.venue.count(),
      prisma.booking.count(),
    ]);

  const totalUsers = customerCount + ownerCount + adminCount;

  // Simple percentages for pie chart slices
  const userDist = [
    { label: "Customers", value: customerCount, color: "#06b6d4" },
    { label: "Owners", value: ownerCount, color: "#0ea5e9" },
    { label: "Admins", value: adminCount, color: "#38bdf8" },
  ];
  const sum = Math.max(1, userDist.reduce((a, b) => a + b.value, 0));
  const circles = (() => {
    let prev = 0;
    const r = 48;
    const c = 2 * Math.PI * r;
    return userDist.map((seg) => {
      const frac = seg.value / sum;
      const len = frac * c;
      const dash = `${len} ${c - len}`;
      const strokeDashoffset = c - prev;
      prev += len;
      return { dash, strokeDashoffset, color: seg.color };
    });
  })();

  // Bar chart values
  const barItems = [
    { label: "Customers", value: customerCount, color: "bg-cyan-500" },
    { label: "Owners", value: ownerCount, color: "bg-cyan-600" },
    { label: "Venues", value: venueCount, color: "bg-sky-500" },
    { label: "Bookings", value: bookingCount, color: "bg-sky-600" },
  ];
  const maxBar = Math.max(1, ...barItems.map((b) => b.value));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-cyan-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Customers"
            value={customerCount}
            icon={<Users className="h-6 w-6 text-cyan-600" />}
            accent="from-cyan-50 to-white"
          />
          <StatCard
            title="Owners"
            value={ownerCount}
            icon={<UserCog className="h-6 w-6 text-cyan-600" />}
            accent="from-sky-50 to-white"
          />
          <StatCard
            title="Venues"
            value={venueCount}
            icon={<Building2 className="h-6 w-6 text-cyan-600" />}
            accent="from-blue-50 to-white"
          />
          <StatCard
            title="Bookings"
            value={bookingCount}
            icon={<CalendarCheck className="h-6 w-6 text-cyan-600" />}
            accent="from-indigo-50 to-white"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Distribution Pie */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-cyan-600" />
                <h2 className="font-semibold text-gray-900">User Role Distribution</h2>
              </div>
              <span className="text-sm text-gray-500">{totalUsers} total users</span>
            </div>
            <div className="flex items-center gap-8">
              <svg width="140" height="140" viewBox="0 0 120 120">
                <g transform="translate(10,10)">
                  <circle cx="50" cy="50" r="48" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                  {circles.map((c, idx) => (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r="48"
                      stroke={c.color}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={c.dash}
                      strokeDashoffset={c.strokeDashoffset}
                      strokeLinecap="butt"
                      transform="rotate(-90 50 50)"
                    />
                  ))}
                </g>
              </svg>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {userDist.map((u) => (
                  <div key={u.label} className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: u.color }} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{u.label}</div>
                      <div className="text-xs text-gray-500">{u.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Totals Bar Chart */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-cyan-600" />
              <h2 className="font-semibold text-gray-900">Overview</h2>
            </div>
            <div className="grid grid-cols-4 gap-4 items-end h-48">
              {barItems.map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 rounded-md ${b.color}`}
                    style={{ height: `${(b.value / maxBar) * 100}%` }}
                    title={`${b.label}: ${b.value}`}
                  />
                  <div className="text-xs text-gray-600 text-center">{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, accent }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} pointer-events-none`} />
      <div className="relative flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{value}</div>
        </div>
        <div className="p-3 rounded-lg bg-white/70 border border-gray-100 shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}


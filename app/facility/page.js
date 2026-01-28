"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { getDashboardStats, addVenueAction } from "@/app/actions/venues";
import { 
  Wallet, Users, Zap, Trophy, ArrowUpRight, 
  Bell, Plus, Filter, X, MapPin, Camera, AlignLeft, Globe, Search
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

export default function FacilityDashboard() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    images: [] 
  });

  // Fetch dashboard data
  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboardData();
    }
  }, [status]);

  const fetchDashboardData = async () => {
    setLoading(true);
    const result = await getDashboardStats();
    if (result.error) {
      toast.error(result.error);
    } else {
      setDashboardData(result);
    }
    setLoading(false);
  };

  const handleConfirmVenue = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await addVenueAction(formData);
    
    if (result.error) {
      toast.error(result.error, {
        style: { borderRadius: '16px', background: '#1e293b', color: '#fff', border: '2px solid #ef4444' },
      });
    } else {
      toast.success(`${formData.name} is now live!`, {
        style: { borderRadius: '16px', background: '#1e293b', color: '#fff', border: '2px solid #06b6d4' },
      });
      setIsModalOpen(false);
      setFormData({ name: "", description: "", address: "", city: "", images: [] });
      // Refresh dashboard data
      await fetchDashboardData();
    }
    setIsSubmitting(false);
  };

  const getIconComponent = (iconName) => {
    const icons = { Wallet, Zap, Users, Trophy };
    return icons[iconName] || Wallet;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans selection:bg-cyan-100">
      <Toaster position="top-right" />
      
      {/* 1. TOP NAVIGATION */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200">
            <span className="text-white font-black italic">K</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter text-slate-800 uppercase italic">
            Kheel<span className="text-cyan-500">Khood</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden md:flex bg-gray-50 px-4 py-2 rounded-xl items-center gap-3 border border-gray-100">
             <Search size={16} className="text-gray-400" />
             <input type="text" placeholder="Search analytics..." className="bg-transparent outline-none text-xs font-bold w-40" />
          </div>
          <button className="p-2 text-gray-400 hover:text-cyan-500 transition-colors"><Bell size={20}/></button>
          <div className="h-9 w-9 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Facility Hub</h2>
            <p className="text-gray-500 font-medium tracking-wide uppercase text-[10px]">Real-time Performance & Operations</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
              <Filter size={16}/> Filter
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-cyan-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-cyan-200 hover:bg-slate-900 transition-all active:scale-95"
            >
              <Plus size={18}/> Add Venue
            </button>
          </div>
        </div>

        {/* 2. STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">Loading stats...</p>
            </div>
          ) : dashboardData?.stats ? (
            dashboardData.stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }} 
                className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 h-full w-1.5 bg-cyan-500 group-hover:bg-violet-600 transition-colors" />
                <div className={`p-3 w-fit bg-gray-50 rounded-2xl mb-4 ${stat.color} group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300`}>
                  {React.createElement(getIconComponent(stat.icon), { size: 24 })}
                </div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-800 mt-1">{stat.value}</h3>
              </motion.div>
            ))
          ) : null}
        </div>

        {/* 3. REVENUE CHART */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-12">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Revenue Streams</h3>
            <div className="flex gap-2">
                <span className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase text-gray-400">Live Updates</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Loading chart data...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData?.revenueData || []}>
                  <defs>
                    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: '700'}} />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                  <Area type="monotone" dataKey="rev" stroke="#06b6d4" strokeWidth={5} fillOpacity={1} fill="url(#cyanGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* 4. PLAYER LEADERBOARD */}
        <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-gray-50/20">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Top Performers</h3>
          </div>
          <table className="w-full text-left">
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td className="px-10 py-6 text-center text-gray-400 col-span-full">
                    Loading top performers...
                  </td>
                </tr>
              ) : dashboardData?.topPerformers && dashboardData.topPerformers.length > 0 ? (
                dashboardData.topPerformers.map((p, i) => (
                  <tr key={i} className="hover:bg-cyan-50/30 transition-colors group">
                    <td className="px-10 py-6 flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl ${p.color} text-white flex items-center justify-center font-black shadow-lg shadow-gray-200`}>{p.name[0]}</div>
                      <span className="font-bold text-slate-700 text-lg">{p.name}</span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sessions</div>
                      <div className="text-slate-600 font-black">{p.sessions} Slots</div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <span className="px-4 py-2 bg-cyan-100 text-cyan-600 rounded-full font-black text-xs">{p.spend}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-10 py-6 text-center text-gray-400">
                    No booking data available yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      {/* 5. ADD VENUE MODAL (Prisma Model Integrated) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isSubmitting && setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Register New Venue</h3>
                <X className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors" onClick={() => setIsModalOpen(false)} />
              </div>

              <form className="space-y-6" onSubmit={handleConfirmVenue}>
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Venue Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" placeholder="e.g. Royal Cricket Academy" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-cyan-500 outline-none font-bold text-slate-700 transition-all" />
                </div>

                {/* Description (Prisma Text field) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Description</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-5 top-4 text-gray-300" size={18} />
                    <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe amenities, lighting, ground type..." className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-cyan-500 outline-none font-bold text-slate-700 transition-all resize-none" />
                  </div>
                </div>

                {/* Address & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
                      <input required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} type="text" placeholder="Area / Landmark" className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-cyan-500 outline-none font-bold text-slate-700 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">City</label>
                    <div className="relative">
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                      <input required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} type="text" placeholder="e.g. Indore" className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-cyan-500 outline-none font-bold text-slate-700 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Images Upload Button */}
                <div className="pt-2">
                  <button type="button" className="w-full flex items-center justify-center gap-3 py-6 border-2 border-dashed border-gray-100 rounded-[2rem] text-gray-400 hover:border-cyan-200 hover:text-cyan-500 transition-all group">
                    <Camera size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Venue Photos</span>
                  </button>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl transition-all ${
                    isSubmitting ? 'bg-gray-300 text-gray-500 shadow-none' : 'bg-slate-900 text-white hover:bg-cyan-500 shadow-cyan-100 active:scale-95'
                  }`}
                >
                  {isSubmitting ? "Uploading to Cloud..." : "Finalize Venue Registration"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


"use client";
import { Search } from "lucide-react"; 
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchAllCreators } from "@/actions/useractions";

export default function Home() {
  const { data: session } = useSession();
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetchAllCreators().then((data) => {
      setCreators(data || []);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* --- 1. HERO SECTION --- */}

      <section className="flex flex-col items-center justify-center text-center px-4 py-20 lg:py-32 bg-surface-soft">
        <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium text-brand mb-6 shadow-sm">
          🚀 The #1 way to get supported
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-dark tracking-tight mb-6">
          Fund your <span className="text-brand">creative work</span>
        </h1>

        <p className="text-xl text-dark-lighter max-w-2xl mb-10">
          Accept support. Start a membership. Sell products. It's easier than
          you think.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="text"
            placeholder={`fuelmywork.com/${session?.user?.name}`}
            className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-lg"
          />
          <Link href={`/${session?.user?.name}`}>
          <button className="w-full bg-brand hover:bg-[#EA580C] text-white font-bold px-8 py-4 rounded-full text-xl cursor-pointer">
            Start my page
          </button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500"></p>
      </section>

      

      <div className="bg-gray-500 h-[1px] opacity-20"></div>

      {/* --- 2. FEATURES SECTION --- */}
      <section className="text-black container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center my-2 py-12 text-gray-900">
          Your Fans can buy you a Coffee
        </h2>
        <div className="flex flex-col md:flex-row gap-10 justify-around items-center">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <div className="bg-orange-100 rounded-full p-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <img width={88} src="./man.gif" alt="Creator working" />
            </div>
            <p className="font-bold text-lg text-gray-900">Fund Your Passion</p>
            <p className="text-center text-gray-600 max-w-xs">
              Focus on what you love doing while your supporters fuel your creative journey.
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <div className="bg-orange-100 rounded-full p-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <img width={88} src="./coin.gif" alt="Coin support" />
            </div>
            <p className="font-bold text-lg text-gray-900">Get Paid Directly</p>
            <p className="text-center text-gray-600 max-w-xs">
              Accept support, tips, and membership fees directly from your fans with no hassle.
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <div className="bg-orange-100 rounded-full p-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <img width={88} src="./group.gif" alt="Community group" />
            </div>
            <p className="font-bold text-lg text-gray-900">Build a Community</p>
            <p className="text-center text-gray-600 max-w-xs">
              Connect deeply with your audience and turn casual followers into loyal members.
            </p>
          </div>
        </div>
      </section>

      

      {/* --- 3. TESTIMONIALS --- */}

      <div className="bg-gray-500 h-[1px] opacity-20"></div>

      {/* --- 4. HOW IT WORKS --- */}
      

      {/* --- ✨ 5. MOVED HERE: SPECTACULAR EXPLORE SECTION ✨ --- */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-orange-50/50 to-white">
        
        {/* Subtle Decorative Blobs (Light) */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2 block">Community</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900">
                    Discover Rising Talent
                </h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">
                    Explore the community of creators, developers, and artists fueling their passion.
                </p>
            </div>

            {/* Creators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {creators.length > 0 ? (
                    creators.map((user) => (
                        <div key={user._id} className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center">
                            
                            {/* Profile Image with Ring */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-orange-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                                <img 
                                    src={user.profilepic || "/avatar.gif"} 
                                    alt={user.username}
                                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm z-10"
                                />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
                            <p className="text-gray-400 text-sm mb-6">@{user.username}</p>

                            {/* Action Button */}
                            <Link href={`/${user.username}`} className="w-full">
                                <button className="w-full py-3 rounded-xl bg-gray-900 text-white hover:bg-orange-600 font-bold transition-colors shadow-md flex items-center justify-center gap-2">
                                    <span>☕</span> Support
                                </button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mb-4"></div>
                        <p className="text-gray-500">Loading creators...</p>
                    </div>
                )}
            </div>

            {/* View All Button */}
            <div className="mt-16 text-center">
                 <Link href="/creators">
                    <button className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-orange-600 hover:text-orange-600 transition-all font-semibold flex items-center gap-2 mx-auto shadow-sm hover:shadow-md">
                        <Search size={18} /> Explore All Creators
                    </button>
                 </Link>
            </div>
        </div>
      </section>

      <div className="bg-gray-500 h-[1px] opacity-20"></div>

      {/* --- 6. FINAL CALL TO ACTION --- */}
      <section className="bg-orange-50 py-16 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-6 font-bold text-gray-900">
            Ready to get funded doing what you love?
          </h2>
          <p className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of creators, developers, and artists using FuelMyWork to support their passion. It takes less than a minute to start.
          </p>

          <Link href="/login">
            <button className="bg-white text-orange-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-orange-50 hover:scale-105 transition transform duration-200 shadow-md hover:border-orange-300 border border-transparent">
              Start my page — It's Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
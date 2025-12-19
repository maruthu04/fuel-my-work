"use client";
import { CheckCircle, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col min-h-screen">
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

      <div className="bg-gray-500 h-1 opacity-30"></div>

      <section className="text-black container mx-auto py-16 px-4">
    <h2 className="text-3xl font-bold text-center my-2 py-12">
        Your Fans can buy you a Coffee
    </h2>
    
    {/* Added 'flex-col' for mobile and 'md:flex-row' for desktop */}
    <div className="flex flex-col md:flex-row gap-10 justify-around items-center">
        
        {/* Item 1 */}
        <div className="item space-y-3 flex flex-col items-center justify-center">
            {/* Changed bg-slate-400 to bg-orange-100 to match the Coffee theme */}
            <div className="bg-orange-100 rounded-full p-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img width={88} src="./man.gif" alt="Creator working" />
            </div>
            <p className="font-bold text-lg">Fund Your Passion</p>
            <p className="text-center text-gray-700 max-w-xs">
                Focus on what you love doing while your supporters fuel your creative journey.
            </p>
        </div>

        {/* Item 2 */}
        <div className="item space-y-3 flex flex-col items-center justify-center">
            <div className="bg-orange-100 rounded-full p-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img width={88} src="./coin.gif" alt="Coin support" />
            </div>
            <p className="font-bold text-lg">Get Paid Directly</p>
            <p className="text-center text-gray-700 max-w-xs">
                Accept support, tips, and membership fees directly from your fans with no hassle.
            </p>
        </div>

        {/* Item 3 */}
        <div className="item space-y-3 flex flex-col items-center justify-center">
             <div className="bg-orange-100 rounded-full p-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img width={88} src="./group.gif" alt="Community group" />
            </div>
            <p className="font-bold text-lg">Build a Community</p>
            <p className="text-center text-gray-700 max-w-xs">
                Connect deeply with your audience and turn casual followers into loyal members.
            </p>
        </div>
    </div>
</section>

      <div className="bg-gray-500 h-1 opacity-30"></div>

      {/* --- Add this below your current Features Section --- */}
<section className="bg-orange-50 py-20 text-black">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Loved by Creators</h2>
    
    {/* Grid for Testimonials */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Testimonial 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <img 
          src="https://i.pravatar.cc/150?img=32" 
          alt="User Avatar" 
          className="w-16 h-16 rounded-full mb-4 border-2 border-orange-400"
        />
        <p className="text-gray-700 italic mb-4">"FuelMyWork changed the game for me. It's so simple for my podcast listeners to support me now. The direct payments are a lifesaver."</p>
        <h4 className="font-bold">Sarah Jenkins</h4>
        <p className="text-sm text-gray-500">Podcaster & Writer</p>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <img 
          src="https://i.pravatar.cc/150?img=11" 
          alt="User Avatar" 
          className="w-16 h-16 rounded-full mb-4 border-2 border-orange-400"
        />
        <p className="text-gray-700 italic mb-4">"I love that I don't need to offer tiered rewards if I don't want to. My fans just want to buy me a coffee for my open-source code."</p>
        <h4 className="font-bold">David Chen</h4>
        <p className="text-sm text-gray-500">Developer</p>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <img 
          src="https://i.pravatar.cc/150?img=5" 
          alt="User Avatar" 
          className="w-16 h-16 rounded-full mb-4 border-2 border-orange-400"
        />
        <p className="text-gray-700 italic mb-4">"Setting up my page took literally 5 minutes. It's the easiest way to monetize my art Instagram without feeling pushy."</p>
        <h4 className="font-bold">Maria Rodriguez</h4>
        <p className="text-sm text-gray-500">Digital Artist</p>
      </div>
      
    </div>
  </div>
</section>

      <div className="bg-gray-500 h-1 opacity-30"></div>

      {/* --- Add this below the Testimonials Section --- */}
<section className="bg-white py-20 text-black">
  <div className="container mx-auto px-4">
     <h2 className="text-3xl font-bold text-center mb-16">It's easier than you think</h2>
     
     <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-20">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center max-w-sm">
           <div className="w-16 h-16 bg-orange-500 text-white text-2xl font-bold rounded-full flex items-center justify-center mb-6 shadow-lg">
             1
           </div>
           <h3 className="text-xl font-bold mb-2">Create your page</h3>
           <p className="text-gray-600">
             Sign up in seconds. Customize your page with a photo and a short bio. No coding required.
           </p>
        </div>

        {/* Step 2 */}
         <div className="flex flex-col items-center text-center max-w-sm">
           <div className="w-16 h-16 bg-orange-500 text-white text-2xl font-bold rounded-full flex items-center justify-center mb-6 shadow-lg">
             2
           </div>
           <h3 className="text-xl font-bold mb-2">Share your link</h3>
           <p className="text-gray-600">
             Add your unique FuelMyWork link to your social bios, video descriptions, or website.
           </p>
        </div>

        {/* Step 3 */}
         <div className="flex flex-col items-center text-center max-w-sm">
           <div className="w-16 h-16 bg-orange-500 text-white text-2xl font-bold rounded-full flex items-center justify-center mb-6 shadow-lg">
             3
           </div>
           <h3 className="text-xl font-bold mb-2">Get supported</h3>
           <p className="text-gray-600">
             Fans can support you instantly. Receive payments directly with 0% platform fees on donations.
           </p>
        </div>

     </div>
  </div>
</section>

      <div className="bg-gray-500 h-1 opacity-30"></div>

      {/* --- Add this as the final section before your Footer --- */}
<section className="bg-orange-50 py-16 ">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl mb-6 font-bold">Ready to get funded doing what you love?</h2>
    <p className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto">
      Join thousands of creators, developers, and artists using FuelMyWork to support their passion. It takes less than a minute to start.
    </p>
    
    {/* Inverted button style for impact */}
    <button className="bg-white text-orange-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-orange-50 hover:scale-105 transition transform duration-200 shadow-md hover:border-orange-300 border">
      Start my page — It's Free
    </button>
    
  </div>
</section>

    </div>
  );
}
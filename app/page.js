import { CheckCircle, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 lg:py-32 bg-surface-soft">
        <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium text-brand mb-6 shadow-sm">
          🚀 The #1 way to get supported
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-dark tracking-tight mb-6">
          Fund your <span className="text-brand">creative work</span>
        </h1>

        <p className="text-2xl text-dark-lighter max-w-2xl mb-10">
          Accept support. Start a membership. Sell products. It's easier than you think.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input type="text" placeholder="fuelmywork.com/yourname" className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-lg" />
          <button className="w-full bg-brand hover:bg-[#EA580C] text-white font-bold px-10 py-4 rounded-full text-xl">Start my page</button>
        </div>
      </section>

      
    </div>
  );
}

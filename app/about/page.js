import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="w-full py-20 px-6 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            We help developers <span className="text-[#EA580C]">showcase their work.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Building a portfolio shouldn't be a hassle. We created this platform to help 
            students and professionals launch their personal page in seconds.
          </p>
        </div>
      </section>

      {/* The Story / Mission */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-[#EA580C]">Our Mission</h2>
            <p className="text-lg text-gray-600">
              As engineering students, we know how hard it is to compile projects, 
              grades, and skills into one clean link. Our mission is to simplify 
              identity on the web—giving you one link that rules them all.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-[#EA580C]">The Tech Stack</h2>
            <p className="text-lg text-gray-600 mb-4">
              This project was built with performance and scalability in mind using:
            </p>
            <ul className="grid grid-cols-2 gap-4 text-gray-500 font-medium">
              <li className="flex items-center gap-2">⚡ Next.js (App Router)</li>
              <li className="flex items-center gap-2">🎨 Tailwind CSS</li>
              <li className="flex items-center gap-2">🔐 NextAuth.js</li>
              <li className="flex items-center gap-2">☁️ Cloud Deployment</li>
            </ul>
          </div>

        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 text-center">
        <h3 className="text-3xl font-bold mb-8">Ready to claim your page?</h3>
        <Link href="/">
          <button className="bg-[#EA580C] hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full text-xl transition-all shadow-lg hover:shadow-xl">
            Get Started Now
          </button>
        </Link>
      </section>
    </main>
  );
}

export const metadata = {
  title: "About",
  description: "Learn more about our mission to help developers showcase their work easily.",
}
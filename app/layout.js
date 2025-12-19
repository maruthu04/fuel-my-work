import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: '%s | FuelMyWork', // %s is replaced by the specific page title
    default: 'FuelMyWork - Fund Your Projects', // Default if a page doesn't have a title
  },
  description: 'The best platform for developers to showcase their projects and get funded.',
  icons: {
    icon: '/icon.png', // Explicitly point to it (optional if file is in app/)
  },
};

export default async function RootLayout({ children }) {
  // 1. Fetch the session on the server

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
        {/* 2. Pass session to Navbar */}
        <Navbar/> 
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
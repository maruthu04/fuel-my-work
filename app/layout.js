import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FuelMyWork",
  description: "Fund your creative work.",
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
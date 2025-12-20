"use client"
import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react"
import { Coffee, Menu, X } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  // State to manage the mobile menu open/close status
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className='border-b bg-white sticky top-0 z-50'>
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        
        {/* 1. Logo (Always Visible) */}
        <Link className="Logo flex gap-1 items-center" href={"/"}>
          <Coffee className="h-6 w-6 text-brand" />
          <span className="font-bold text-xl text-dark">FuelMyWork</span>
        </Link>

        {/* 2. Desktop Menu (Hidden on mobile, Flex on md+) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-dark-lighter hover:text-dark font-medium">About</Link>
          <Link href="/faq" className="text-dark-lighter hover:text-dark font-medium">FAQ</Link>
          
          <div className="flex gap-4 items-center">
            {session ? (
              <>
                <span className="text-dark-lighter text-sm">Welcome, <b>{session.user.name}</b></span>
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })} 
                  className='border border-orange-300 rounded-full px-4 py-1.5 hover:bg-[#EA580C] text-black hover:text-white transition-all shadow-sm hover:shadow-md cursor-pointer text-sm font-medium'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href={"/login"}>
                  <button className='border border-orange-300 rounded-full px-4 py-1.5 hover:bg-[#EA580C] text-black hover:text-white transition-all shadow-sm hover:shadow-md cursor-pointer text-sm font-medium'>
                    Login
                  </button>
                </Link>
                <Link href={"/signup"}> {/* Assuming signup route */}
                  <button className="bg-brand bg-orange-600 hover:bg-[#EA580C] text-white px-5 py-1.5 rounded-full text-sm font-medium hover:shadow-lg shadow-md transition-all cursor-pointer">
                    Start my page
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* 3. Mobile Menu Button (Visible on mobile, Hidden on md+) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-orange-600 focus:outline-none">
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Dropdown Menu (Conditionally Rendered) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-4 px-6 py-6 items-center text-center">
            <Link 
              href="/about" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-gray-600 hover:text-orange-600 font-medium w-full py-2"
            >
              About
            </Link>
            <Link 
              href="/faq" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-gray-600 hover:text-orange-600 font-medium w-full py-2 border-b border-gray-100"
            >
              FAQ
            </Link>

            
            {session ? (
              <div className="flex flex-col gap-3 w-full items-center pt-2">
                <span className="text-gray-500 text-sm">Signed in as <b>{session.user.name}</b></span>
                <button 
                  onClick={() => { signOut({ callbackUrl: "/" }); setIsMenuOpen(false); }} 
                  className='w-full border border-orange-300 rounded-full px-4 py-2 hover:bg-[#EA580C] text-black hover:text-white transition-all font-medium'
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full pt-2">
                <Link href={"/login"} onClick={() => setIsMenuOpen(false)} className="w-full">
                  <button className='w-full border border-orange-300 rounded-full px-4 py-2 hover:bg-[#EA580C] text-black hover:text-white transition-all font-medium'>
                    Login
                  </button>
                </Link>
                <Link href={"/signin"} onClick={() => setIsMenuOpen(false)} className="w-full">
                  <button className="w-full bg-orange-600 hover:bg-[#EA580C] text-white px-6 py-2 rounded-full font-medium shadow-md transition-all">
                    Start my page
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
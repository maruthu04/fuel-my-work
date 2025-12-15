"use client"
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { Coffee } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <nav className='border-b bg-white sticky top-0 z-50 flex items-center justify-around px-6 py-4'>
        <Link className="Logo flex gap-1" href={"/"}>
        <Coffee className="h-6 w-6 text-brand" />
        <span className="font-bold text-xl text-dark">FuelMyWork</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-dark-lighter hover:text-dark">About</Link>
            <Link href="/faq" className="text-dark-lighter hover:text-dark">FAQ</Link>
          </div>

          <div className="register-btn flex gap-6 items-center">
            {session && <>
              <span className="text-dark-lighter">Welcome, <b>{session.user.name}</b></span>
              <button onClick={() => signOut()} className='border border-orange-300 rounded-full px-4 py-1 hover:bg-[#EA580C] text-black hover:text-white transition-all shadow-lg hover:shadow-xl'>Logout</button></>
            }
              
            
            {!session &&
            <>
            <Link href={"/login"}>
            <button className='border border-orange-300 rounded-full px-4 py-1 hover:bg-[#EA580C] text-black hover:text-white transition-all shadow-lg hover:shadow-xl'>Login</button>
            </Link>
            </>
            }
            
            
          </div>
    </nav>
  )
}

export default Navbar
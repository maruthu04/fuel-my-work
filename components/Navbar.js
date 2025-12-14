import React from 'react'
import { Coffee } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='border-b bg-white sticky top-0 z-50 flex items-center justify-around px-6 py-4'>
        <div className="Logo flex gap-1">
        <Coffee className="h-6 w-6 text-brand" />
        <span className="font-bold text-xl text-dark">FuelMyWork</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-dark-lighter hover:text-dark">About</Link>
            <Link href="/faq" className="text-dark-lighter hover:text-dark">FAQ</Link>
          </div>

          <div className="register-btn flex gap-6 items-center">
            <Link href={"/signin"}>
            <button className='border rounded-full px-4 py-1 bg-brand hover:bg-[#EA580C] text-white transition-all shadow-lg hover:shadow-xl'>SignIn</button>
            </Link>
            <Link href={"/login"}>
            <button className='border border-orange-300 rounded-full px-4 py-1 hover:bg-[#EA580C] text-black hover:text-white transition-all shadow-lg hover:shadow-xl'>Login</button>
            </Link>
            
          </div>
    </nav>
  )
}

export default Navbar
// "use client"
// import React from 'react';
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation';

// const dashboard = () => {
//     const { data: session } = useSession();
    
//         if(!session) {
//           const router = useRouter();
//           router.push('/login');
//         }

//   return (
//     <div>dashboard</div>
//   )
// }

// export default dashboard



"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react" // Import useEffect

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // ✅ GOOD: This runs AFTER the component renders
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return <div>Dashboard Content</div>
}
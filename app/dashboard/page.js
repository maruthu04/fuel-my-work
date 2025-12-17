"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react" // Import useEffect

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const InputField = ({ label, id, type = "text", placeholder }) => {
  return (
    <div className="mb-5">
      <label 
        htmlFor={id} 
        className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        // The magic happens in the focus: classes below
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 
                   focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 
                   transition-all duration-200 ease-in-out shadow-sm"
      />
    </div>
  );
};

  useEffect(() => {
    // ✅ GOOD: This runs AFTER the component renders
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return <div className="min-h-screen bg-gray-50 flex justify-center items-center py-6"> {/* Reduced outer padding */}
      
      {/* Changed max-w-2xl to max-w-lg (Smaller Width) */}
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Compact Header */}
        <div className="px-6 py-5 text-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Welcome to your Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Update your profile and payment details.
          </p>
        </div>

        {/* Form Inputs */}
        <form className="px-6 py-6">
          
          <div className="grid grid-cols-2 gap-4 mb-2">
             {/* Name and Username side-by-side to save space */}
             <InputField id="name" label="Name" placeholder="e.g. Maruthu Devendrar" />
             <InputField id="username" label="Username" placeholder="maruthu" />
          </div>

          <InputField id="email" label="Email" type="email" placeholder="alpha@gmail.com" />
          
          <div className="my-4 border-t border-gray-100"></div>
          
          <InputField id="profilePic" label="Profile Picture URL" placeholder="https://..." />
          <InputField id="coverPic" label="Cover Picture URL" placeholder="https://..." />
          
          <div className="my-4 border-t border-gray-100"></div>

          <InputField id="razorpay" label="Razorpay Credentials" type="password" placeholder="Enter your key secret" />

          {/* Compact Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white 
                         bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                         transform transition-all active:scale-[0.98] cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
}
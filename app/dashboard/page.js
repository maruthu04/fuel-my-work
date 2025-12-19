"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { updateProfile, fetchuser } from "@/actions/useractions"

// ✅ FIX: Define this component OUTSIDE of the main Dashboard function
// We also added 'value' and 'onChange' so typing works correctly
const InputField = ({ label, id, type = "text", placeholder, value, onChange }) => {
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
        value={value || ""} // Controlled input
        onChange={onChange} // Update state on type
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 
                   focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 
                   transition-all duration-200 ease-in-out shadow-sm"
      />
    </div>
  );
};

export default function Dashboard() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({})

  useEffect(() => {
    if (status === "authenticated") {
      getData()
    } else if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const getData = async () => {
    let u = await fetchuser(session?.user?.name);
    // Merge DB data with session data (if DB is empty)
    setForm(u || session?.user || {}); 
  }

  // Handle typing in inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (formData) => {
      await updateProfile(formData, session?.user?.name);
      alert("Profile Updated Successfully!");
  }

  if (status === "loading") return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="px-6 py-5 text-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Welcome to your Dashboard</h2>
        </div>

        <form className="px-6 py-6" action={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-2">
             {/* Pass value and onChange to the fixed InputField */}
             <InputField id="name" label="Name" value={form.name} onChange={handleChange} placeholder="Name" />
             <InputField id="username" label="Username" value={form.username} onChange={handleChange} placeholder="Username" />
          </div>

          <InputField id="email" label="Email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
          
          <div className="my-4 border-t border-gray-100"></div>
          
          <InputField id="profilepic" label="Profile Picture URL" value={form.profilepic} onChange={handleChange} />
          <InputField id="coverpic" label="Cover Picture URL" value={form.coverpic} onChange={handleChange} />
          
          <div className="my-4 border-t border-gray-100"></div>

          <div className="grid grid-cols-2 gap-4">
             <InputField id="razorpayid" label="Razorpay ID" value={form.razorpayid} onChange={handleChange} />
             <InputField id="razorpaysecret" label="Razorpay Secret" type="password" value={form.razorpaysecret} onChange={handleChange} />
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
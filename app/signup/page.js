"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `Sign Up | FuelMyWork`;
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
    }

    try {
        // 2. Call our API
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Account created! Redirecting to login...", {
                onClose: () => router.push("/login") 
            });
            // Reset form
            setFormData({ email: "", password: "", confirmPassword: "" });
        } else {
            toast.error(data.error || "Something went wrong");
        }
    } catch (error) {
        toast.error("Network error. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <div className="max-w-lg w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join FuelMyWork to start receiving support
          </p>
        </div>

        {/* Social Signup (Optional - usually same as login) */}
        <div className="flex flex-col gap-3">
             <button onClick={() => signIn("google")} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-3 text-gray-700 hover:bg-gray-50 font-medium transition">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                <span>Sign up with Google</span>
             </button>
             <button onClick={() => signIn("github")} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-3 text-gray-700 hover:bg-gray-50 font-medium transition">
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="Github" className="h-5 w-5" />
                <span>Sign up with Github</span>
             </button>
        </div>

        <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-200 w-full absolute"></div>
            <span className="bg-white px-4 text-sm text-gray-500 relative z-10 font-medium">or register with email</span>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                onChange={handleChange} 
                value={formData.email}
                id="email" name="email" type="email" required 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" 
                placeholder="Enter your email" 
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                onChange={handleChange} 
                value={formData.password}
                id="password" name="password" type="password" required 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" 
                placeholder="Create a password" 
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input 
                onChange={handleChange} 
                value={formData.confirmPassword}
                id="confirmPassword" name="confirmPassword" type="password" required 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" 
                placeholder="Confirm your password" 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white 
                ${loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"} 
                transition duration-200`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
        </form>

        <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-orange-600 hover:text-orange-500 transition">
                Login here
            </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
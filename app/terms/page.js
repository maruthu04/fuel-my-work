import React from 'react';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Navigation Bar / Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link href="/dashboard" className="text-gray-500 hover:text-orange-600 transition-colors flex items-center gap-2 font-medium">
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-orange-600 px-8 py-6 text-white">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <p className="mt-2 text-orange-100">Last updated: December 20, 2025</p>
        </div>

        {/* Legal Text Content */}
        <div className="p-8 space-y-8 text-gray-700 leading-relaxed">
          
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to <strong>FuelMyWork</strong>. By accessing or using our website, 
              services, and dashboard, you agree to be bound by these Terms and Conditions. If you disagree with any part 
              of these terms, you may not access the service.
            </p>
          </section>

          {/* 2. User Accounts */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. User Accounts & Security</h2>
            <p>
              To use certain features of our service (such as creating a profile page), you must register for an account. 
              You agree to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
              <li>Provide accurate, current, and complete information during the registration process.</li>
              <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
              <li>Notify us immediately if you discover or suspect any security breaches.</li>
            </ul>
          </section>

          {/* 3. User Generated Content */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Generated Content</h2>
            <p>
              Our platform allows you to post content, including profile pictures, cover photos, and usernames. You retain ownership of any 
              intellectual property rights that you hold in that content. However, by uploading content, you grant us a worldwide, 
              royalty-free license to use, reproduce, and display such content in connection with the service.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-3 rounded-r-lg">
              <p className="text-sm text-orange-800 font-semibold">
                <strong>Strictly Prohibited:</strong> You may not upload content that is illegal, offensive, defamatory, or infringes on others' rights.
              </p>
            </div>
          </section>

          {/* 4. Payments & Razorpay */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Payments and Monetization</h2>
            <p>
              Our platform integrates with <strong>Razorpay</strong> to facilitate payments. By connecting your Razorpay ID and Secret:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
              <li>You agree to comply with Razorpay's Terms of Service and Acceptable Use Policy.</li>
              <li>We are not responsible for any failed transactions, hold-ups, or issues arising directly from Razorpay's infrastructure.</li>
              <li>You are responsible for all taxes and fees associated with the payments you receive.</li>
            </ul>
          </section>

          {/* 5. Termination */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          {/* 6. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p>
              In no event shall <strong>FuelMyWork</strong>, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          {/* 7. Contact Us */}
          <section className="border-t border-gray-100 pt-6 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <a href="mailto:support@yourapp.com" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all">
              support@yourapp.com
            </a>
          </section>

        </div>
        
        {/* Footer of the card */}
        <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-500 border-t border-gray-100">
          &copy; {new Date().getFullYear()} [Your App Name]. All rights reserved.
        </div>
      </div>
    </div>
  );
}
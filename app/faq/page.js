export default function FAQ() {
  const faqs = [
    {
      question: "Is this platform free to use?",
      answer: "Yes! This is currently a final-year engineering project and is completely free for students and developers to use to showcase their work."
    },
    {
      question: "How do I create my page?",
      answer: "Simply sign in using your Google or GitHub account on the homepage. Once logged in, click 'Start my page' to generate your unique URL based on your username."
    },
    {
      question: "Can I customize my URL?",
      answer: "Your URL is automatically generated from your name (e.g., /john-doe). If you need to change it, please contact support or update your profile settings."
    },
    {
      question: "What technology is this built on?",
      answer: "We use Next.js 14+ with the App Router, Tailwind CSS for styling, and MongoDB for our database."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Frequently Asked <span className="text-[#EA580C]">Questions</span>
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <details className="p-6 cursor-pointer">
                <summary className="font-semibold text-lg list-none flex justify-between items-center text-gray-800">
                  {faq.question}
                  <span className="transition-transform group-open:rotate-180">
                    <svg className="w-6 h-6 text-[#EA580C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            </div>
          ))}
        </div>
        
      </div>
    </main>
  );
}
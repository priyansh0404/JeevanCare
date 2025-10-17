import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-0 px-0 flex flex-col items-center">
      {/* Header Image - height reduced */}
      <div className="w-full h-36 bg-[url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center flex items-center justify-center shadow-lg">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-2xl bg-blue-900 bg-opacity-60 px-8 py-3 rounded-2xl">
          Privacy Policy
        </h1>
      </div>
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-10 mt-[-2.5rem] mb-10 border-2 border-blue-100">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
              alt="Privacy"
              className="rounded-xl shadow-lg w-56 h-56 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Your Privacy Matters</h2>
              <p className="text-gray-700 mb-2">
                At <span className="font-semibold text-blue-700">Jeevan Care</span>, we are committed to protecting your personal information and your right to privacy. We value your trust and strive to be transparent about how we collect, use, and safeguard your data.
              </p>
              <ul className="list-none space-y-2 text-blue-800">
                <li className="flex items-center">
                  <span className="mr-2">🔒</span>
                  Your data is encrypted and stored securely
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔒</span>
                  We never share your information without your consent
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔒</span>
                  You control your privacy settings at all times
                </li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">What Information We Collect</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Name, email, and contact details</li>
                <li>Health and appointment information</li>
                <li>Usage data and device information</li>
                <li>Feedback and support queries</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">How We Use Your Data</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>To provide and improve our services</li>
                <li>To personalize your experience</li>
                <li>To send reminders and notifications</li>
                <li>To respond to your queries and feedback</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Your Rights & Choices</h3>
              <p className="text-gray-700 mb-2">
                You have full control over your data. You can update your information, request deletion, or change your privacy settings at any time from your account dashboard.
              </p>
              <ul className="list-none space-y-2 text-green-800">
                <li className="flex items-center">
                  <span className="mr-2">✅</span>
                  Access and update your data easily
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✅</span>
                  Request data deletion anytime
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✅</span>
                  Contact our support for privacy concerns
                </li>
              </ul>
            </div>
            <img
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
              alt="Data Security"
              className="rounded-xl shadow-lg w-56 h-56 object-cover"
            />
          </div>
          <div className="bg-blue-50 rounded-xl p-6 mt-8 shadow text-center">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">Questions or Concerns?</h4>
            <p className="text-gray-700 mb-2">
              If you have any questions about our privacy policy or how your data is handled, please contact us at:
            </p>
            <a
              href="mailto:support@jeevancare.com"
              className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              support@jeevancare.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
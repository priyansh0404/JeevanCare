import React from 'react';

export default function SupportPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-white to-blue-300 flex flex-col items-center justify-center py-0 px-0">
      <div className="w-full h-64 bg-[url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center flex items-center justify-center shadow-lg">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl bg-blue-900 bg-opacity-50 px-8 py-4 rounded-2xl">
          Support
        </h1>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 mt-[-4rem] mb-10 flex flex-col md:flex-row gap-10 items-center border-2 border-blue-100">
          <div className="flex-1 flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80"
              alt="Support Telephone"
              className="rounded-2xl shadow-xl w-56 h-56 object-cover mb-6 border-4 border-blue-200"
            />
            <div className="bg-blue-50 rounded-xl p-4 w-full text-center mb-4">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">We're Here to Help!</h2>
              <p className="text-gray-700 mb-2">
                Our support team is available{' '}
                <span className="font-semibold text-blue-700">24/7</span> to assist you with any questions, issues, or feedback regarding Jeevan Care.
              </p>
              <div className="flex flex-col gap-2 items-center">
                <div className="flex items-center">
                  <span className="text-blue-600 text-2xl mr-2">📞</span>
                  <span className="text-lg text-gray-700">+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 text-2xl mr-2">✉️</span>
                  <span className="text-lg text-gray-700">support@jeevancare.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 text-2xl mr-2">💬</span>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-700 underline hover:text-blue-900"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
                alt="Help Desk"
                className="rounded-xl shadow-md w-32 h-24 object-cover mb-2"
              />
              <span className="text-blue-700 font-semibold">Your health, our priority!</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-blue-100 rounded-xl p-6 shadow-inner mb-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3 text-center">Frequently Asked Questions</h3>
              <ul className="list-none text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">❓</span>
                  <span>
                    <span className="font-semibold text-blue-700">How do I reset my password?</span>
                    <br />
                    Go to the login page and click on "Forgot Password" to receive reset instructions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">❓</span>
                  <span>
                    <span className="font-semibold text-blue-700">How can I book an appointment?</span>
                    <br />
                    Use the "Book Appointment" feature in the app to select your doctor and time slot.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">❓</span>
                  <span>
                    <span className="font-semibold text-blue-700">Where can I find health courses?</span>
                    <br />
                    Visit the "Courses" section for a variety of health and nutrition topics.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">❓</span>
                  <span>
                    <span className="font-semibold text-blue-700">How do I contact a doctor online?</span>
                    <br />
                    Use the "Online Consultation" feature to connect with certified professionals.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-4 shadow text-center mt-4">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">Still need help?</h4>
              <p className="text-gray-700 mb-2">
                Reach out to us anytime. We are committed to providing you with the best support experience.
              </p>
              <a
                href="mailto:support@jeevancare.com"
                className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
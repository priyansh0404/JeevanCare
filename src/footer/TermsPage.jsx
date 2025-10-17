import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-0 px-0 flex flex-col items-center">
      {/* Header Image */}
      <div className="w-full h-36 bg-[url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center flex items-center justify-center shadow-lg">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-2xl bg-blue-900 bg-opacity-60 px-8 py-3 rounded-2xl">
          Terms & Conditions
        </h1>
      </div>
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-10 mt-[-2.5rem] mb-10 border-2 border-blue-100">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              alt="Terms"
              className="rounded-xl shadow-lg w-56 h-56 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Welcome to Jeevan Care</h2>
              <p className="text-gray-700 mb-2">
                By using Jeevan Care, you agree to our terms and conditions. Please read them carefully to understand your rights and responsibilities as a user of our platform.
              </p>
              <ul className="list-none space-y-2 text-blue-800">
                <li className="flex items-center">
                  <span className="mr-2">✔️</span>
                  Use Jeevan Care for lawful and personal health purposes only
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔️</span>
                  Respect the privacy and rights of other users
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔️</span>
                  Do not misuse or attempt to harm the platform
                </li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">User Responsibilities</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Provide accurate and up-to-date information</li>
                <li>Maintain confidentiality of your account credentials</li>
                <li>Report any suspicious activity or misuse</li>
                <li>Follow medical advice from certified professionals only</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Commitment</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Protect your data and privacy</li>
                <li>Provide reliable and secure services</li>
                <li>Continuously improve user experience</li>
                <li>Respond promptly to your queries and concerns</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Limitations & Disclaimers</h3>
              <p className="text-gray-700 mb-2">
                Jeevan Care is a digital health platform and does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any medical concerns.
              </p>
              <ul className="list-none space-y-2 text-red-800">
                <li className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  We are not liable for any loss or damage from misuse of the app
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  Third-party links are provided for convenience only
                </li>
              </ul>
            </div>
            <img
              src="https://i.ytimg.com/vi/Eu11qMtq7cs/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLDsb8hil-OqrSrKiIbsc0rURprnMA"
              alt="Disclaimer"
              className="rounded-xl shadow-lg w-56 h-56 object-cover"
            />
          </div>
          <div className="bg-blue-50 rounded-xl p-6 mt-8 shadow text-center">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">Contact & Updates</h4>
            <p className="text-gray-700 mb-2">
              For questions about our terms or to report a violation, contact us at:
            </p>
            <a
              href="mailto:support@jeevancare.com"
              className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              support@jeevancare.com
            </a>
            <p className="text-gray-600 mt-4 text-sm">
              Jeevan Care may update these terms from time to time. Please check this page regularly for the latest information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
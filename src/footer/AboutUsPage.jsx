import React from 'react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">About Jeevan Care</h1>
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
          alt="Healthcare"
          className="rounded-xl shadow-lg w-72 h-56 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Empowering Your Health Journey</h2>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold text-blue-700">Jeevan Care</span> is your trusted companion for managing your health and wellness. Our app brings together appointment booking, health education, reminders, and expert consultations in one easy-to-use platform.
          </p>
          <ul className="list-none space-y-2 text-blue-800">
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Book doctor appointments anytime, anywhere
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Access a library of health & nutrition courses
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Get timely reminders for medicines and checkups
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Consult with certified health professionals online
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Secure, private, and easy to use for all ages
            </li>
          </ul>
        </div>
      </div>

      {/* New Section: Our Mission */}
      <div className="max-w-4xl w-full mt-12 bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-green-700 mb-3">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At Jeevan Care, our mission is to make healthcare accessible, affordable, and understandable for everyone. We strive to bridge the gap between patients and healthcare providers, ensuring you get the right care at the right time.
          </p>
          <ul className="list-none space-y-2 text-green-800">
            <li className="flex items-center">
              <span className="mr-2">🌱</span>
              Promote preventive healthcare and healthy living
            </li>
            <li className="flex items-center">
              <span className="mr-2">🌱</span>
              Empower users with reliable health information
            </li>
            <li className="flex items-center">
              <span className="mr-2">🌱</span>
              Support communities with digital health tools
            </li>
          </ul>
        </div>
        <img
          src="https://img.freepik.com/free-photo/medical-banner-with-doctor-working-laptop_23-2149611211.jpg"
          alt="Mission"
          className="rounded-xl shadow-lg w-72 h-56 object-cover"
        />
      </div>

      {/* Existing Images Section */}
      <div className="max-w-4xl w-full mt-10 grid md:grid-cols-3 gap-6">
        <img
          src="https://thumbs.dreamstime.com/b/doctor-consulting-patient-medicine-drugs-old-67274786.jpg"
          alt="Doctor Consultation"
          className="rounded-xl shadow-md w-full h-40 object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
          alt="Healthy Lifestyle"
          className="rounded-xl shadow-md w-full h-40 object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
          alt="Nutrition"
          className="rounded-xl shadow-md w-full h-40 object-cover"
        />
      </div>

      {/* New Section: User Stories */}
      <div className="max-w-4xl w-full mt-12 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User 1"
              className="w-20 h-20 rounded-full mb-2 shadow"
            />
            <p className="italic text-gray-700 mb-1">
              "Jeevan Care helped me book appointments for my parents and reminded us about their medicines. It's a blessing for busy families!"
            </p>
            <span className="text-blue-700 font-semibold">- Priya S.</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User 2"
              className="w-20 h-20 rounded-full mb-2 shadow"
            />
            <p className="italic text-gray-700 mb-1">
              "The health courses are easy to understand and really improved my lifestyle. Highly recommended!"
            </p>
            <span className="text-blue-700 font-semibold">- Rahul M.</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl text-center mt-10">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Why Choose Jeevan Care?</h3>
        <p className="text-gray-700">
          We believe everyone deserves access to quality healthcare and reliable information. Jeevan Care is designed to simplify your health management, keep you informed, and connect you with the care you need—right at your fingertips.
        </p>
      </div>
    </div>
  );
}
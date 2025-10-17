import React from 'react';
export default function ContactPage() {
  return (
    <section className="w-screen min-h-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 flex flex-col items-center justify-center py-20 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">Contact Us</h1>
          <p className="mb-8 text-lg md:text-xl opacity-90">We'd love to hear from you! Reach out for support, feedback, or partnership opportunities. Our team is available 24/7.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📞</span>
              <span className="text-lg">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✉️</span>
              <span className="text-lg">support@jeevancare.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <a href="https://www.jeevancare.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-200 transition">www.jeevancare.com</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-200 transition">Chat on WhatsApp</a>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <a href="https://play.google.com/store/apps/details?id=jeevancare" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-700 font-bold px-6 py-2 rounded-full shadow hover:bg-blue-100 transition flex items-center gap-2">
              <span>📱</span> Android App
            </a>
            <a href="mailto:support@jeevancare.com" className="bg-yellow-400 text-blue-900 font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition flex items-center gap-2">
              <span>✉️</span> Email Us
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="relative">
            <img src="https://img.freepik.com/free-vector/flat-people-customer-support_23-2148887720.jpg" alt="Contact" className="w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white" />
            <span className="absolute -top-4 -right-4 bg-green-400 text-white px-4 py-1 rounded-full font-bold shadow-lg animate-bounce">24/7</span>
          </div>
          <div className="mt-6 text-white/80 text-center">
            <p>Our support team is always ready to help you with any queries or feedback.<br />We value your suggestions to make Jeevan Care better for everyone!</p>
          </div>
        </div>
      </div>
      {/* Decorative SVG Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180" style={{height:'60px'}}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0V46.29c47.29,22,104.09,29,158,17.39C267.86,44.15,327.09,4.22,385,0c87.09-6.77,172.18,27.21,258,35.19C745.74,41.86,816.13,17.44,885,6.13c61.87-10.19,136.13-6.13,195,16.58V0Z" opacity=".25" fill="#fff"></path>
          <path d="M0,0V15.81C47.42,22.74,103.69,36.14,158,28.4c70.36-10.37,136.09-51.9,206-57.49C438.13-36.41,512.09,6.13,583,22.55c69.09,16.09,138.13,1.13,206-13.32C872.13,1.13,939.09,17.44,1000,28.4c55.87,10.19,117.13,6.13,170-16.58V0Z" opacity=".5" fill="#fff"></path>
          <path d="M0,0V5.63C47.42,22.74,103.69,36.14,158,28.4c70.36-10.37,136.09-51.9,206-57.49C438.13-36.41,512.09,6.13,583,22.55c69.09,16.09,138.13,1.13,206-13.32C872.13,1.13,939.09,17.44,1000,28.4c55.87,10.19,117.13,6.13,170-16.58V0Z" fill="#fff"></path>
        </svg>
      </div>
    </section>
  );
}

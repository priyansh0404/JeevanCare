import React, { useState } from 'react';
import { Calendar, Bell, Video, BookOpen } from 'lucide-react';
import logo from '../assets/heart-health.png';
import SymptomCheckerTensor from '../chatbot/Ai';

const LandingPage = ({ onNavigate, currentUser, onLogout }) => {

    const [language, setLanguage] = useState('en');

    const content = {
        hero: {
            welcome: "Bringing Healthcare Closer to You",
            description: "Accessible telemedicine services designed for rural communities, ensuring quality care is always within reach.",
            getStarted: "Get Started"
        },
        services: {
            title: "Our Services",
            appointments: { title: "Book Appointments", description: "Schedule virtual consultations with qualified doctors at your convenience.", button: "Book Now" },
            notifications: { title: "Notifications", description: "Stay updated with appointment reminders and important health alerts.", button: "View Alerts" },
            consultations: { title: "Access Consultations", description: "Join your scheduled video consultations easily from anywhere.", button: "Join Call" },
            education: { title: "Health Education", description: "Learn about preventive care, nutrition, and common health issues through our courses.", button: "Explore Courses" }
        },
        about: {
            title: "About JeevanCare",
            description1: "JeevanCare is dedicated to bridging the healthcare gap in underserved rural areas. We leverage technology to provide convenient, reliable, and affordable medical consultations, empowering communities with better health outcomes.",
            description2: "Our platform connects patients with experienced healthcare professionals, offering a range of services from general check-ups to specialized care, all from the comfort of your home."
        },
        cta: { title: "Ready to Experience Convenient Healthcare?", button: "Start Your Journey" },
        footer: {
            quickLinks: "Quick Links",
            legal: "Legal",
            aboutUs: "About Us",
            services: "Services",
            contact: "Contact",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            support: "Support",
            tagline: "Bringing healthcare closer to rural communities through technology."
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* Header */}
            <header className="bg-gray-100 shadow-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img src={logo} alt="JeevanCare Logo" className="w-12 h-12 rounded-lg shadow-sm" />
                        <span className="text-2xl font-extrabold text-gray-900 tracking-tight">JeevanCare</span>
                    </div>

                    <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
                        <button onClick={() => onNavigate('/')} className="hover:text-teal-600 transition-colors">Home</button>
                        <button onClick={() => onNavigate('dashboard')} className="hover:text-teal-600 transition-colors">Dashboard</button>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                        >
                            <option value="en">🌐 English</option>
                            <option value="hi">🌐 हिंदी</option>
                            <option value="pa">🌐 ਪੰਜਾਬੀ</option>
                        </select>

                        {currentUser ? (
                            <button
                                onClick={onLogout}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => onNavigate('login')}
                                className="px-4 py-2 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors"
                            >
                                Login / Register
                            </button>
                        )}
                    </div>

                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-blue-50 py-24">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">{content.hero.welcome}</h1>
                    <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">{content.hero.description}</p>
                    <button
                        onClick={() => onNavigate('register')}
                        className="px-10 py-4 bg-teal-500 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-teal-600 transition-all"
                    >
                        {content.hero.getStarted}
                    </button>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">{content.services.title}</h2>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {['appointments', 'notifications', 'consultations', 'education'].map((key, idx) => {
                            const service = content.services[key];
                            const icons = [Calendar, Bell, Video, BookOpen];
                            const Icon = icons[idx];
                            const colors = [
                                { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-600', hover: 'hover:bg-blue-50' },
                                { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-600', hover: 'hover:bg-yellow-50' },
                                { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-600', hover: 'hover:bg-green-50' },
                                { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-600', hover: 'hover:bg-purple-50' }
                            ];

                            const handleClick = () => {
                                if (key === 'consultations') onNavigate('consultation');
                                else if (key === 'appointments') onNavigate('book-appointment');
                                else if (key === 'education') onNavigate('courses');
                                else onNavigate(key);
                            };

                            return (
                                <div
                                    key={key}
                                    className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-6 flex flex-col items-center text-center"
                                >
                                    <div className={`${colors[idx].bg} rounded-full w-20 h-20 flex items-center justify-center mb-6`}>
                                        <Icon className={`h-10 w-10 ${colors[idx].text}`} />
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-6">{service.description}</p>

                                    <button
                                        onClick={handleClick}
                                        className={`${colors[idx].text} ${colors[idx].border} border px-6 py-3 rounded-lg font-medium transition-colors ${colors[idx].hover} hover:scale-105`}
                                    >
                                        {service.button}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-gradient-to-r from-white to-blue-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{content.about.title}</h2>
                    <p className="text-lg md:text-xl text-gray-700 mb-6">{content.about.description1}</p>
                    <p className="text-lg md:text-xl text-gray-700">{content.about.description2}</p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-500 to-green-400 rounded-xl mx-6 md:mx-24 shadow-xl">
                <div className="max-w-4xl mx-auto px-6 text-center p-12 rounded-2xl bg-white/10 backdrop-blur-sm">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{content.cta.title}</h2>
                    <button
                        onClick={() => onNavigate('register')}
                        className="px-10 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition-all"
                    >
                        {content.cta.button}
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img src={logo} alt="JeevanCare Logo" className="w-12 h-12 rounded-lg shadow-sm" />
                            <span className="text-2xl font-bold">JeevanCare</span>
                        </div>
                        <p className="text-gray-400">{content.footer.tagline}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{content.footer.quickLinks}</h3>
                        <div className="space-y-2">
                            <button className="block text-gray-400 hover:text-white" onClick={() => onNavigate('aboutus')}>{content.footer.aboutUs}</button>
                            <button className="block text-gray-400 hover:text-white" onClick={() => onNavigate('services')}>{content.footer.services}</button>
                            <button className="block text-gray-400 hover:text-white" onClick={() => onNavigate('contact')}>{content.footer.contact}</button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{content.footer.legal}</h3>
                        <div className="space-y-2">
                            <button className="block text-gray-400 hover:text-white" onClick={() => onNavigate('privacy')}>{content.footer.privacy}</button>
                            <button className="block text-gray-400 hover:text-white" onClick={() => onNavigate('terms')}>{content.footer.terms}</button>
                            <button className="block text-gray-400 hover:text-white" onClick={() => onNavigate('support')}>{content.footer.support}</button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* AI Symptom Checker */}
            <SymptomCheckerTensor />
        </div>
    );
};

export default LandingPage;

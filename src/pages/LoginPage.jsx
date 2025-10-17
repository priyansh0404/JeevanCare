import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import logo from '../assets/heart-health.png';

const LoginPage = ({ onLogin, onNavigate }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMethod, setLoginMethod] = useState("email");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleLogin = async () => {
        try {
            if (loginMethod === "email") {
                const userCred = await signInWithEmailAndPassword(auth, email, password);
                onLogin(userCred.user);
            } else {
                alert("Phone OTP login not implemented yet");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="JeevanCare Logo" className="w-10 h-10 rounded-lg" />
                        <span className="text-xl font-bold text-gray-900">JeevanCare</span>
                    </div>

                    <nav className="flex space-x-6">
                        <button onClick={() => onNavigate("landing")} className="text-gray-600 hover:text-gray-900">Home</button>
                        <button className="text-gray-600 hover:text-gray-900">Dashboard</button>
                    </nav>

                    <button onClick={() => onNavigate("register")} className="text-gray-600 hover:text-gray-900">Login / Register</button>
                </div>
            </header>

            {/* Login Card */}
            <div className="flex flex-1 items-center justify-center py-16">
                <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to access your consultations and health records.</p>
                    </div>

                    {/* Login Method Tabs */}
                    <div className="flex border-b mb-6">
                        <button
                            onClick={() => setLoginMethod("email")}
                            className={`flex-1 py-2 text-center font-medium ${loginMethod === "email" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"}`}
                        >
                            Email Login
                        </button>
                        <button
                            onClick={() => setLoginMethod("phone")}
                            className={`flex-1 py-2 text-center font-medium ${loginMethod === "phone" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"}`}
                        >
                            Phone OTP
                        </button>
                    </div>

                    {/* Form Fields */}
                    {loginMethod === "email" ? (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+91 XXXXX XXXXX"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                            />
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-md"
                    >
                        Login
                    </button>

                    {/* Forgot Password */}
                    {loginMethod === "email" && (
                        <div className="text-center mt-3">
                            <button className="text-teal-500 hover:text-teal-700 text-sm">Forgot password?</button>
                        </div>
                    )}

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => onNavigate("register")}
                                className="text-teal-500 hover:text-teal-700 font-medium"
                            >
                                Register Here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

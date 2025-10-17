import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import logo from '../assets/heart-health.png'

const RegisterPage = ({ onNavigate }) => {
    const [selectedRole, setSelectedRole] = useState('patient');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const roles = [
        { value: 'patient', label: 'Patient', icon: '👤' },
        { value: 'doctor', label: 'Doctor', icon: '👩‍⚕️' },
        { value: 'consultant', label: 'Consultant', icon: '👨‍💻' },
        { value: 'learner', label: 'Learner', icon: '👨‍🎓' },
        { value: 'admin', label: 'Admin', icon: '🛠️' }
    ];

    const handleRegister = async () => {
        if (!fullName || !email || !password) return alert('Please fill all required fields');
        if (password !== confirmPassword) return alert('Passwords do not match');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                userId: user.uid,
                fullName,
                email,
                role: selectedRole,
                createdAt: new Date()
            });



            alert('Registration successful! Please login.');
            onNavigate('login');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="JeevanCare Logo" className="w-10 h-10 rounded-lg" />

                        <span className="text-xl font-bold text-gray-900">JeevanCare</span>
                    </div>

                    <nav className="flex space-x-6">
                        <button onClick={() => onNavigate('landing')} className="text-gray-600 hover:text-gray-900">Home</button>
                        <button className="text-gray-600 hover:text-gray-900">Dashboard</button>
                    </nav>

                    <button onClick={() => onNavigate('login')} className="text-gray-600 hover:text-gray-900">Login / Register</button>
                </div>
            </header>

            <div className="flex items-center justify-center py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your JeevanCare Account</h1>
                        <p className="text-gray-600">Join us to access essential healthcare services tailored for rural communities.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Role</h3>
                            <div className="grid grid-cols-5 gap-3">
                                {roles.map((role) => (
                                    <button
                                        key={role.value}
                                        onClick={() => setSelectedRole(role.value)}
                                        className={`p-4 rounded-lg border-2 text-center transition-colors ${selectedRole === role.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="text-2xl mb-2">{role.icon}</div>
                                        <div className="text-sm font-medium">{role.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Register with Email</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Create a strong password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button onClick={handleRegister} className="bg-teal-500 text-white px-6 py-3 rounded-lg">
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

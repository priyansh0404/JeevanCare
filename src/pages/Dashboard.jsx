import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ currentUser, onLogout }) => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        // Fetch full user data
        const fetchUserData = async () => {
            const userRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) setUserData(userSnap.data());
        };

        // Fetch appointments
        const fetchAppointments = async () => {
            const q = query(collection(db, 'appointments'), where('userId', '==', currentUser.uid));
            const snapshot = await getDocs(q);
            const appts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAppointments(appts);
        };

        fetchUserData();
        fetchAppointments();
    }, [currentUser]);

    return (
        <div className="min-h-screen bg-teal-50">
            {/* Navbar */}
            <header className="bg-teal-500 shadow-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1
                        className="text-2xl font-bold text-white cursor-pointer"
                        onClick={() => navigate('/dashboard')}
                    >
                        JeevanCare
                    </h1>

                    <nav className="flex items-center space-x-6">
                        <button
                            onClick={() => navigate('/')}
                            className="text-white hover:text-gray-200 font-medium transition"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/book-appointment')}
                            className="text-white hover:text-gray-200 font-medium transition"
                        >
                            Book Appointment
                        </button>

                        {currentUser && (
                            <div className="ml-6 flex items-center space-x-4"> {/* Increased spacing from 2 to 4 */}
                                <span className="text-white font-semibold">
                                    {userData?.fullName || 'User'}
                                </span>
                                <button
                                    onClick={onLogout}
                                    className="text-red-700 hover:text-red-900 font-medium transition" // Dark red applied
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Appointments</h2>

                {appointments.length === 0 ? (
                    <p className="text-gray-600">You have no appointments scheduled.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments.map(appt => (
                            <div
                                key={appt.id}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transform transition"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">
                                        Doctor: <span className="font-normal">{appt.doctorName}</span>
                                    </p>
                                    <p className="font-semibold text-gray-800 mb-1">
                                        Date: <span className="font-normal">{appt.date}</span>
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        Time: <span className="font-normal">{appt.time}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate(`/video-consultation/${appt.id}`)}
                                    className="mt-4 bg-teal-500 text-white py-2 rounded-xl hover:bg-teal-600 shadow transition-colors font-semibold"
                                >
                                    Join Call
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;

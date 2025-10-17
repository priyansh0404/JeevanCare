import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const BookAppointment = ({ userId }) => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('Video Consultation');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Fetch doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'users'));
                const docs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    userId: doc.data().userId || doc.id,
                }));

                const doctorsList = docs.filter(
                    user => user.role?.trim().toLowerCase() === 'doctor'
                );

                if (doctorsList.length) {
                    setDoctors(doctorsList);
                    setSelectedDoctor(doctorsList[0].id);
                }
            } catch (err) {
                console.error('Error fetching doctors:', err);
            }
        };
        fetchDoctors();
    }, []);

    const handleSubmit = async () => {
        if (!selectedDoctor || !date || !time)
            return alert('Please fill all fields');

        setLoading(true);
        try {
            const doctorData = doctors.find(d => d.id === selectedDoctor);

            await addDoc(collection(db, 'appointments'), {
                userId,
                doctorId: doctorData.userId,
                doctorName: doctorData.fullName || doctorData.name || 'Unnamed',
                date,
                time,
                type,
                createdAt: new Date(),
            });

            alert('Appointment booked successfully!');
            setDate('');
            setTime('');
        } catch (err) {
            alert('Error booking appointment: ' + err.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-teal-50">
            {/* Navbar */}
            <div className="relative w-full bg-teal-500 py-6 shadow-md flex items-center justify-center mb-10">
                <button
                    onClick={() => navigate('/')}
                    className="absolute left-6 bg-white text-teal-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                    Home
                </button>
                <h1 className="text-center text-3xl md:text-4xl font-bold text-white">
                    Book an Appointment
                </h1>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="absolute right-6 bg-white text-teal-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                    Dashboard
                </button>
            </div>

            {/* Appointment Form */}
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
                {/* Doctor Selection */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Doctor</label>
                    <select
                        value={selectedDoctor}
                        onChange={e => setSelectedDoctor(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    >
                        {doctors.length === 0 ? (
                            <option>Loading doctors...</option>
                        ) : (
                            doctors.map(doc => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.fullName || doc.name || 'Unnamed'}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    />
                </div>

                {/* Time */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    />
                </div>

                {/* Type */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    >
                        <option value="Video Consultation">Video Consultation</option>
                        <option value="In-Person Consultation">In-Person Consultation</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 shadow-lg transition-all"
                >
                    {loading ? 'Booking...' : 'Book Appointment'}
                </button>
            </div>
        </div>
    );
};

export default BookAppointment;

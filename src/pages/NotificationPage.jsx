import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Bell } from "lucide-react";

const colors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-500",
    "from-teal-400 to-teal-600",
    "from-indigo-400 to-indigo-600",
    "from-red-400 to-red-600"
];

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const q = query(
            collection(db, "appointments"),
            where("userId", "==", userId),
            orderBy("date", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notes = snapshot.docs.map((doc, idx) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: `Appointment with Dr. ${data.doctorName}`,
                    message: `On ${data.date} at ${data.time}`,
                    color: colors[idx % colors.length]
                };
            });
            setNotifications(notes);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            {/* Full-width Header */}
            <div className="w-full bg-teal-500 p-6 shadow-md">
                <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-md">
                    Notifications
                </h1>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                {notifications.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg mt-6">
                        No notifications yet.
                    </p>
                ) : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notifications.map((note) => (
                            <div
                                key={note.id}
                                className={`relative bg-gradient-to-r ${note.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 flex flex-col justify-between`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-white/30 p-2 rounded-full">
                                        <Bell className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{note.title}</h2>
                                </div>
                                <p className="text-white/90 mb-4">{note.message}</p>
                                <div className="text-right">
                                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                                        New
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const VideoRoom = () => {
    const [creating, setCreating] = useState(false);
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        setCreating(true);
        try {
            const roomRef = doc(collection(db, "rooms"));
            const roomId = roomRef.id;

            // Create room in Firestore
            await setDoc(roomRef, {
                createdAt: serverTimestamp(),
                offer: null,
                answer: null,
            });

            // Redirect to VideoConferenceApp with roomId
            navigate(`/video/${roomId}`);
        } catch (err) {
            console.error(err);
            alert("Error creating room");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="p-6 text-white bg-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Create Video Consultation Room</h1>
            <button
                onClick={handleCreateRoom}
                className="bg-green-600 px-4 py-2 rounded text-white"
                disabled={creating}
            >
                {creating ? "Creating..." : "Create Room"}
            </button>
        </div>
    );
};

export default VideoRoom;

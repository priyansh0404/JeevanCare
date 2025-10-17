import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom"; // for roomId via route
import {
    getFirestore, collection, doc, setDoc, onSnapshot, addDoc, serverTimestamp
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAPp85p7R1yZZvkccgbqByju3WpBYNR2JE",
    authDomain: "jeevancare-d0d40.firebaseapp.com",
    projectId: "jeevancare-d0d40",
    storageBucket: "jeevancare-d0d40.firebasestorage.app",
    messagingSenderId: "55540774629",
    appId: "1:55540774629:web:26b9fea92331f8812cc60c",
    measurementId: "G-BRET7272GN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

const VideoConferenceApp = () => {
    const { roomId: routeRoomId } = useParams(); // roomId from route
    const [localStream, setLocalStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [statusMessage, setStatusMessage] = useState("Ready");
    const [roomId, setRoomId] = useState(routeRoomId || "");

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // Start camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;
            setStatusMessage("Camera started");
        } catch (err) {
            console.error(err);
            setStatusMessage("Error starting camera");
        }
    };

    // Clean up
    const cleanup = () => {
        if (peerConnection) peerConnection.close();
        if (localStream) localStream.getTracks().forEach(track => track.stop());
        setPeerConnection(null);
        setLocalStream(null);
        setStatusMessage("Call ended");
    };

    // Create room (caller)
    const createRoom = async () => {
        if (!localStream) return alert("Start your camera first!");

        const pc = new RTCPeerConnection(servers);
        setPeerConnection(pc);

        // Add local tracks
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

        // Remote tracks
        pc.ontrack = event => {
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Create Firestore room
        const roomRef = doc(collection(db, "rooms"));
        setRoomId(roomRef.id);

        // ICE candidates
        const callerCandidatesCollection = collection(roomRef, "callerCandidates");
        pc.onicecandidate = event => {
            if (event.candidate) addDoc(callerCandidatesCollection, event.candidate.toJSON());
        };

        // Create offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await setDoc(roomRef, { offer: offer.toJSON(), createdAt: serverTimestamp() });

        // Listen for answer
        onSnapshot(roomRef, snapshot => {
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data?.answer) {
                pc.setRemoteDescription(data.answer);
                setStatusMessage("Connected!");
            }
        });

        // Listen for callee ICE
        const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");
        onSnapshot(calleeCandidatesCollection, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            });
        });

        setStatusMessage(`Room created. Share this ID: ${roomRef.id}`);
    };

    // Join room (callee)
    const joinRoom = async () => {
        if (!localStream) return alert("Start your camera first!");
        if (!roomId) return alert("Enter Room ID");

        const roomRef = doc(db, "rooms", roomId);
        const roomSnap = await roomRef.get?.() || await roomRef; // just to avoid error, Firestore v9 get
        const roomData = (await import("firebase/firestore")).getDoc ? (await import("firebase/firestore")).getDoc(roomRef).then(s => s.data()) : {}; // workaround

        if (!roomData?.offer) return alert("Room not found or no offer!");

        const pc = new RTCPeerConnection(servers);
        setPeerConnection(pc);

        // Add local tracks
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

        // Remote tracks
        pc.ontrack = event => {
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
        };

        // ICE candidates
        const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");
        pc.onicecandidate = event => {
            if (event.candidate) addDoc(calleeCandidatesCollection, event.candidate.toJSON());
        };

        // Set remote offer
        await pc.setRemoteDescription(roomData.offer);

        // Create answer
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        await setDoc(roomRef, { answer: answer.toJSON() }, { merge: true });

        // Listen for caller ICE
        const callerCandidatesCollection = collection(roomRef, "callerCandidates");
        onSnapshot(callerCandidatesCollection, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            });
        });

        setStatusMessage("Connected!");
    };

    return (
        <div className="p-6 text-white bg-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Firestore WebRTC Video Conference</h1>

            <div className="flex gap-4 my-4">
                <video ref={localVideoRef} autoPlay muted className="w-1/2 bg-gray-700 rounded" />
                <video ref={remoteVideoRef} autoPlay className="w-1/2 bg-gray-700 rounded" />
            </div>

            <div className="flex gap-2 mb-4">
                <button onClick={startCamera} className="bg-blue-600 px-4 py-2 rounded">Start Camera</button>
                {!roomId && <button onClick={createRoom} className="bg-green-600 px-4 py-2 rounded">Create Room</button>}
                <input
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                    placeholder="Enter Room ID"
                    className="px-2 text-black rounded"
                />
                {roomId && <button onClick={joinRoom} className="bg-yellow-600 px-4 py-2 rounded">Join Room</button>}
                <button onClick={cleanup} className="bg-red-600 px-4 py-2 rounded">End Call</button>
            </div>

            <p className="mt-2">{statusMessage}</p>
        </div>
    );
};

export default VideoConferenceApp;

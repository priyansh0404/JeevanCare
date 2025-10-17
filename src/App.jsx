import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import BookAppointment from './pages/BookAppointments'
import NotificationPage from './pages/NotificationPage'
import HealthEducationPage from './pages/HealthEducationPage'
import VideoConferenceApp from './pages/VideoConsultationPage'
import CoursesPage from './pages/CoursesPage'
import AboutUsPage from './footer/AboutUsPage'
import ContactPage from './footer/ContactPage'
import PrivacyPage from './footer/PrivacyPage'
import ServicesPage from './footer/ServicesPage'
import SupportPage from './footer/SupportPage'
import TermsPage from './footer/TermsPage'
import SymptomCheckerTensor from './chatbot/Ai'
import VideoRoom from './pages/VideoRoom'
// import { ThemeContext } from './context/ThemeContext'
// import { ThemeProvider } from './context/ThemeContext'
import { mockUsers } from './utils/mockData'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  const handleLogin = (user) => {
    setCurrentUser(user)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onNavigate={(p) => navigate(p === 'landing' ? '/' : `/${p}`)}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        }
      />

      <Route
        path="/login"
        element={<LoginPage onLogin={handleLogin} onNavigate={(p) => navigate(p === 'landing' ? '/' : `/${p}`)} />}
      />

      <Route
        path="/register"
        element={<RegisterPage onNavigate={(p) => navigate(p === 'landing' ? '/' : `/${p}`)} />}
      />

      <Route path="/dashboard" element={<Dashboard currentUser={currentUser} onLogout={handleLogout} />} />
      <Route path="/book-appointment" element={currentUser ? <BookAppointment userId={currentUser.uid} /> : <LoginPage onLogin={handleLogin} onNavigate={(p) => navigate(`/${p}`)} />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/education" element={<HealthEducationPage />} />
      {/* <Route path="/video-room" element={<VideoRoom />} /> */}
      <Route path="/courses" element={<CoursesPage />} />

      {/* New static pages */}
      <Route path="/aboutus" element={<AboutUsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* Video Consultation */}
      <Route path="/consultation" element={currentUser ? <VideoConferenceApp /> : <LoginPage onLogin={handleLogin} onNavigate={(p) => navigate(`/${p}`)} />} />
      <Route path="/video-consultation/:appointmentId" element={currentUser ? <VideoConferenceApp /> : <LoginPage onLogin={handleLogin} onNavigate={(p) => navigate(`/${p}`)} />} />


      <Route path="/" element={<VideoRoom />} />
      <Route path="/video/:roomId" element={<VideoConferenceApp />} />



      {/* Fallback */}
      <Route
        path="*"
        element={
          <LandingPage
            onNavigate={(p) => navigate(p === 'landing' ? '/' : `/${p}`)}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        }
      />
    </Routes>



  )
}

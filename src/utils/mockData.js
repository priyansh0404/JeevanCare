export const mockUsers = {
    patient: { id: 1, name: 'Rajesh Kumar', role: 'patient', lang: 'hi', email: 'rajesh@example.com' },
    doctor: { id: 2, name: 'Dr. Priya Sharma', role: 'doctor', lang: 'en', email: 'priya@example.com' },
    learner: { id: 3, name: 'Simran Singh', role: 'learner', lang: 'pa', email: 'simran@example.com' },
    consultant: { id: 4, name: 'Dr. Amit Verma', role: 'consultant', lang: 'en', email: 'amit@example.com' },
    admin: { id: 5, name: 'Admin User', role: 'admin', lang: 'en', email: 'admin@example.com' }
}

export const mockAppointments = [
    { id: 1, patient: 'Rajesh Kumar', doctor: 'Dr. Sarah Chen', date: '2025-07-20', time: '10:00 AM', type: 'Video Call', status: 'scheduled' },
    { id: 2, patient: 'Simran Singh', doctor: 'Dr. John Doe', date: '2025-07-25', time: '02:30 PM', type: 'Phone Call', status: 'scheduled' },
    { id: 3, patient: 'Current User', doctor: 'Dr. Emily White', date: '2025-07-28', time: '11:00 AM', type: 'Video Call', status: 'pending' }
]

export const mockPrescriptions = [
    { id: 1, medicine: 'Amoxicillin 500mg', dosage: 'Twice daily', issued: '7/10/2024', doctor: 'Dr. Sarah Chen' },
    { id: 2, medicine: 'Ibuprofen 200mg', dosage: 'As needed', issued: '6/25/2024', doctor: 'Dr. John Doe' }
]

export const mockMessages = [
    { id: 1, from: 'Dr. Sarah Chen', message: 'Follow-up on recent consultation', time: '7/15/2024', read: false },
    { id: 2, from: 'Support Team', message: 'Your account security update', time: '7/12/2024', read: true }
]

export const mockCourses = [
    { id: 1, title: 'Nutrition Basics for Rural Health', instructor: 'Dr. Priya Sharma', duration: '4 weeks', enrolled: 156, rating: 4.8, category: 'Nutrition', level: 'Beginner', thumbnail: '🥗', description: 'Learn essential nutrition principles for maintaining health in rural communities.' },
    { id: 2, title: 'First Aid Emergency Response', instructor: 'Dr. Amit Verma', duration: '2 weeks', enrolled: 243, rating: 4.9, category: 'Emergency Care', level: 'Intermediate', thumbnail: '🚑', description: 'Master basic first aid techniques for emergency situations.' },
    { id: 3, title: 'Preventing Waterborne Diseases', instructor: 'Dr. Priya Sharma', duration: '3 weeks', enrolled: 89, rating: 4.7, category: 'Public Health', level: 'Beginner', thumbnail: '💧', description: 'Understanding and preventing common waterborne illnesses in rural areas.' }
]

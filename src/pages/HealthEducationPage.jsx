import React from "react"

const HealthEducationPage = () => {
    const topics = [
        { id: 1, title: "Healthy Eating", description: "Learn how to maintain a balanced diet for better health." },
        { id: 2, title: "Exercise & Fitness", description: "Daily exercise routines to boost energy and wellness." },
        { id: 3, title: "Mental Health", description: "Tips for reducing stress and improving emotional well-being." },
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6">Health Education</h1>
            <div className="grid gap-6 md:grid-cols-2">
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold text-blue-600">{topic.title}</h2>
                        <p className="text-gray-700 mt-2">{topic.description}</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HealthEducationPage

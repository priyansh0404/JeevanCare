import React, { useState } from 'react';

const courses = [
    {
        title: "Nutrition Basics",
        description: "Learn about essential nutrients, balanced diets, and healthy eating habits.",
        details: "A balanced diet includes carbohydrates, proteins, fats, vitamins, and minerals.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        link: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
        youtube: "https://www.youtube.com/watch?v=Q4q3rQGfbMM",
        resources: [
            { name: "WHO: Healthy Diet", url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
            { name: "ChooseMyPlate.gov", url: "https://www.myplate.gov/" }
        ]
    },
    {
        title: "Mental Health Awareness",
        description: "Understand mental health, stress management, and emotional well-being.",
        details: "Topics include recognizing stress, coping strategies, and when to seek help.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
        link: "https://www.mentalhealth.gov/basics/what-is-mental-health",
        youtube: "https://www.youtube.com/watch?v=6dKrbCDn2nE",
        resources: [
            { name: "MentalHealth.gov", url: "https://www.mentalhealth.gov/basics/what-is-mental-health" }
        ]
    },
    {
        title: "Exercise & Fitness",
        description: "Discover the importance of physical activity and simple exercises for all ages.",
        details: "Covers daily routines, stretching, and exercises for different fitness levels.",
        image: "https://img.freepik.com/free-vector/young-women-exercising-flat-illustration-set_107791-14287.jpg",
        link: "https://www.cdc.gov/physicalactivity/basics/index.htm",
        youtube: "https://www.youtube.com/watch?v=UBMk30rjy0o",
        resources: [
            { name: "CDC: Physical Activity Basics", url: "https://www.cdc.gov/physicalactivity/basics/index.htm" }
        ]
    },
    {
        title: "Preventive Care",
        description: "Learn about vaccinations, screenings, and healthy lifestyle choices.",
        details: "Focuses on disease prevention, regular check-ups, and healthy habits.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
        link: "https://www.cdc.gov/prevention/",
        youtube: "https://www.youtube.com/watch?v=QZp6v3tGqFg",
        resources: [
            { name: "CDC: Prevention", url: "https://www.cdc.gov/prevention/" }
        ]
    },
    {
        title: "Healthy Cooking",
        description: "Explore healthy recipes and cooking techniques for nutritious meals.",
        details: "Learn to prepare meals that are both delicious and good for your health, including tips on reducing salt, sugar, and unhealthy fats.",
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
        link: "https://www.eatright.org/food/planning-and-prep/cooking-tips-and-trends",
        youtube: "https://www.youtube.com/watch?v=3UjUWfwWACw",
        resources: [
            { name: "EatRight: Cooking Tips", url: "https://www.eatright.org/food/planning-and-prep/cooking-tips-and-trends" }
        ]
    },
    {
        title: "Child Nutrition",
        description: "Understand the nutritional needs of children at different ages.",
        details: "Covers breastfeeding, weaning, balanced meals for kids, and how to encourage healthy eating habits from a young age.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        link: "https://www.unicef.org/nutrition/index_childnutrition.html",
        youtube: "https://www.youtube.com/watch?v=8pQ9b4hQ2hE",
        resources: [
            { name: "UNICEF: Child Nutrition", url: "https://www.unicef.org/nutrition/index_childnutrition.html" }
        ]
    },
    {
        title: "Women’s Health",
        description: "Focus on nutrition and wellness for women at all life stages.",
        details: "Topics include prenatal nutrition, bone health, and managing menopause through diet and lifestyle.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpG5b0uziHQSkQK4Io3YbpLbWgA0mkrCF3aQ&s",
        link: "https://www.womenshealth.gov/nutrition",
        youtube: "https://www.youtube.com/watch?v=3p8JfdpYy1w",
        resources: [
            { name: "WomensHealth.gov: Nutrition", url: "https://www.womenshealth.gov/nutrition" }
        ]
    },
    {
        title: "Elderly Care",
        description: "Learn about nutrition and exercise for healthy aging.",
        details: "Covers common health concerns for seniors, meal planning, and safe physical activities.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        link: "https://www.nia.nih.gov/health/eating-well-older-adults",
        youtube: "https://www.youtube.com/watch?v=8l4y1M7v1nI",
        resources: [
            { name: "NIA: Eating Well for Older Adults", url: "https://www.nia.nih.gov/health/eating-well-older-adults" }
        ]
    },
    {
        title: "Hydration & Wellness",
        description: "Understand the importance of hydration for overall health.",
        details: "Learn how much water you need, signs of dehydration, and tips for staying hydrated.",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
        link: "https://www.cdc.gov/healthyweight/healthy_eating/water-and-healthier-drinks.html",
        youtube: "https://www.youtube.com/watch?v=9iMGFqMmUFs",
        resources: [
            { name: "CDC: Water & Healthier Drinks", url: "https://www.cdc.gov/healthyweight/healthy_eating/water-and-healthier-drinks.html" }
        ]
    },
    {
        title: "Managing Chronic Diseases",
        description: "Nutrition and lifestyle tips for managing diabetes, hypertension, and more.",
        details: "Covers dietary approaches, exercise, and monitoring for chronic disease management.",
        image: "https://static.wixstatic.com/media/d55165_bde795c040c443a985b87877f5c69263~mv2.jpg/v1/fill/w_210,h_210,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Chronic%20disease%20graphic.jpg",
        link: "https://www.cdc.gov/chronicdisease/resources/publications/aag/chronic.htm",
        youtube: "https://www.youtube.com/watch?v=7gFjLkKqgF8",
        resources: [
            { name: "CDC: Chronic Disease Overview", url: "https://www.cdc.gov/chronicdisease/resources/publications/aag/chronic.htm" }
        ]
    }
];

const cardColors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-600",
    "from-teal-400 to-teal-600",
    "from-indigo-400 to-indigo-600",
    "from-red-400 to-red-600",
    "from-orange-400 to-orange-600",
    "from-cyan-400 to-cyan-600"
];

export default function CoursesPage() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-12 px-4">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800 drop-shadow-lg tracking-tight">
                Health & Nutrition Courses
            </h1>
            <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {courses.map((course, idx) => (
                    <div
                        key={idx}
                        className={`
              relative rounded-2xl shadow-xl transition-all duration-300 p-0 flex flex-col border-0 overflow-hidden
              group
              hover:z-20 hover:scale-105 hover:shadow-2xl
              ${openIndex === idx ? 'z-30 scale-105 shadow-2xl' : ''}
            `}
                        style={{ minHeight: 270 }}
                    >
                        {/* Card Header with Image */}
                        <div className="h-32 w-full overflow-hidden flex items-center justify-center bg-gray-200">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="object-cover w-full h-full"
                                style={{ minHeight: '100%', minWidth: '100%' }}
                            />
                        </div>
                        {/* Card Body */}
                        <div className="flex-1 bg-white p-6 flex flex-col justify-between rounded-b-2xl">
                            <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">{course.title}</h2>
                            <p className="text-gray-700 mb-6 text-center">{course.description}</p>
                            <button
                                className={`mx-auto px-5 py-2 rounded-full font-semibold shadow-sm transition-colors duration-200 ${openIndex === idx
                                        ? 'bg-teal-100 text-blue-800 border border-blue-600'
                                        : 'bg-teal-500 text-white hover:bg-teal-700'
                                    }`}
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            >
                                {openIndex === idx ? "Hide Details" : "View Details"}
                            </button>
                        </div>
                        {/* Details Modal */}
                        {openIndex === idx && (
                            <div className="absolute inset-0 bg-white bg-opacity-95 rounded-2xl p-8 flex flex-col justify-center items-center z-30 shadow-2xl animate-fadeIn border-4 border-blue-300">
                                <div className="text-blue-900 text-base mb-4 text-center">{course.details}</div>
                                {course.link && (
                                    <div className="mb-2">
                                        <a
                                            href={course.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 underline font-medium hover:text-blue-900"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                )}
                                {course.youtube && (
                                    <div className="mb-2">
                                        <a
                                            href={course.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 underline font-medium hover:text-red-800 flex items-center gap-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.157 3.5 12 3.5 12 3.5s-7.157 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.42 0 12 0 12s0 3.58.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.843 20.5 12 20.5 12 20.5s7.157 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.58 24 12 24 12s0-3.58-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                            Watch on YouTube
                                        </a>
                                    </div>
                                )}
                                {course.resources && course.resources.length > 0 && (
                                    <div className="mb-2 w-full">
                                        <div className="font-semibold mb-1 text-blue-800 text-center">Resources:</div>
                                        <div className="flex flex-col items-center gap-1">
                                            {course.resources.map((res, i) => (
                                                <a
                                                    key={i}
                                                    href={res.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-700 underline hover:text-blue-900"
                                                >
                                                    {res.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <button
                                    className="mt-4 px-5 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-700"
                                    onClick={() => setOpenIndex(null)}
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <style>
                {`
          .animate-fadeIn {
            animation: fadeIn 0.3s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
            </style>
        </div>
    );
}
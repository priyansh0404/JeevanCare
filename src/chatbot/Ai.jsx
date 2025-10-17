import React, { useState, useEffect, useRef } from 'react';
// import * as tf from 'tensorflow';
import * as tf from "@tensorflow/tfjs";
import {
    Mic,
    MicOff,
    Plus,
    X,
    Heart,
    Thermometer,
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    Brain,
    Shield,
    Zap,
    TrendingUp,
    User,
    Settings,
    BarChart3
} from 'lucide-react';

const SymptomCheckerApp = () => {
    // Core state management
    const [symptoms, setSymptoms] = useState([]);
    const [currentSymptom, setCurrentSymptom] = useState('');
    const [vitals, setVitals] = useState({ temperature: '', heartRate: '', bloodPressure: '', weight: '' });
    const [vitalErrors, setVitalErrors] = useState({});
    const [isListening, setIsListening] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [fontLanguage, setFontLanguage] = useState('en');
    const [model, setModel] = useState(null);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [modelAccuracy, setModelAccuracy] = useState(0);
    const [activeTab, setActiveTab] = useState('symptoms');

    const recognitionRef = useRef(null);

    // Professional translations
    const translations = {
        bloodPressureLabel: {
            en: 'Blood Pressure (mmHg)',
            hi: 'रक्तचाप (mmHg)',
            pa: 'ਲਹੂ ਦਾ ਦਬਾਅ (mmHg)',
        },
        bloodPressurePlaceholder: {
            en: '120',
            hi: '१२०',
            pa: '੧੨੦',
        },
        bloodPressureError: {
            en: 'Enter a valid blood pressure',
            hi: 'मान्य रक्तचाप दर्ज करें',
            pa: 'ਠੀਕ ਲਹੂ ਦਾ ਦਬਾਅ ਦਰਜ ਕਰੋ',
        },
        weightLabel: {
            en: 'Weight (lbs)',
            hi: 'वजन (पाउंड)',
            pa: 'ਵਜ਼ਨ (ਪੌਂਡ)',
        },
        weightPlaceholder: {
            en: '150',
            hi: '१५०',
            pa: '੧੫੦',
        },
        weightError: {
            en: 'Enter a valid weight',
            hi: 'मान्य वजन दर्ज करें',
            pa: 'ਠੀਕ ਵਜ਼ਨ ਦਰਜ ਕਰੋ',
        },
        describeSymptoms: {
            en: 'Describe Your Symptoms',
            hi: 'अपने लक्षणों का वर्णन करें',
            pa: 'ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵੇਰਵਾ ਦਿਓ',
        },
        symptomInputPlaceholder: {
            en: 'Type your symptom here...',
            hi: 'यहाँ अपना लक्षण लिखें...',
            pa: 'ਇੱਥੇ ਆਪਣਾ ਲੱਛਣ ਲਿਖੋ...',
        },
        currentSymptoms: {
            en: 'Current Symptoms:',
            hi: 'वर्तमान लक्षण:',
            pa: 'ਮੌਜੂਦਾ ਲੱਛਣ:',
        },
        vitalSigns: {
            en: 'Vital Signs',
            hi: 'महत्वपूर्ण संकेत',
            pa: 'ਮਹੱਤਵਪੂਰਨ ਸੰਕੇਤ',
        },
        temperatureLabel: {
            en: 'Temperature (°F)',
            hi: 'तापमान (°F)',
            pa: 'ਤਾਪਮਾਨ (°F)',
        },
        temperaturePlaceholder: {
            en: '98.6',
            hi: '९८.६',
            pa: '੯੮.੬',
        },
        temperatureError: {
            en: 'Enter a valid temperature (92-110 °F)',
            hi: 'मान्य तापमान दर्ज करें (92-110 °F)',
            pa: 'ਠੀਕ ਤਾਪਮਾਨ ਦਰਜ ਕਰੋ (92-110 °F)',
        },
        heartRateLabel: {
            en: 'Heart Rate (bpm)',
            hi: 'हृदय दर (bpm)',
            pa: 'ਧੜਕਨ (bpm)',
        },
        heartRatePlaceholder: {
            en: '72',
            hi: '७२',
            pa: '੭੨',
        },
        heartRateError: {
            en: 'Enter a valid heart rate (40-180 bpm)',
            hi: 'मान्य हृदय दर दर्ज करें (40-180 bpm)',
            pa: 'ਠੀਕ ਧੜਕਨ ਦਰਜ ਕਰੋ (40-180 bpm)',
        },
        appName: {
            en: 'HealthAI Pro',
            hi: 'हेल्थ एआई प्रो',
            pa: 'ਹੈਲਥ ਏਆਈ ਪਰੋ',
        },
        tagline: {
            en: 'Advanced AI-Powered Health Analysis Platform',
            hi: 'उन्नत एआई-संचालित स्वास्थ्य विश्लेषण मंच',
            pa: 'ਉੱਨਤ ਏਆਈ-ਚਾਲਿਤ ਸਿਹਤ ਵਿਸ਼ਲੇਸ਼ਣ ਪਲੇਟਫਾਰਮ',
        },
        disclaimer: {
            en: 'This professional-grade AI tool is designed for educational and informational purposes. Always consult with qualified healthcare professionals for medical decisions.',
            hi: 'यह पेशेवर-ग्रेड एआई उपकरण शैक्षिक और सूचनात्मक उद्देश्यों के लिए डिज़ाइन किया गया है। चिकित्सा निर्णयों के लिए हमेशा योग्य स्वास्थ्य देखभाल पेशेवरों से सलाह लें।',
            pa: 'ਇਹ ਪੇਸ਼ੇਵਰ-ਗ੍ਰੇਡ ਏਆਈ ਟੂਲ ਸਿੱਖਿਆ ਅਤੇ ਜਾਣਕਾਰੀ ਦੇ ਉਦੇਸ਼ਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ। ਡਾਕਟਰੀ ਫੈਸਲਿਆਂ ਲਈ ਹਮੇਸ਼ਾ ਯੋਗ ਸਿਹਤ ਸੇਵਾ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਸਲਾਹ ਕਰੋ।',
        },
        analyze: {
            en: 'Analyze Health',
            hi: 'स्वास्थ्य का विश्लेषण करें',
            pa: 'ਸਿਹਤ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
        },
        analyzing: {
            en: 'AI Analysis in Progress...',
            hi: 'एआई विश्लेषण चल रहा है...',
            pa: 'ਏਆਈ ਵਿਸ਼ਲੇਸ਼ਣ ਜਾਰੀ ਹੈ...',
        },
        symptoms: {
            en: 'Symptoms',
            hi: 'लक्षण',
            pa: 'ਲੱਛਣ',
        },
        vitals: {
            en: 'Vital Signs',
            hi: 'जीवन संकेत',
            pa: 'ਜੀਵਨ ਸੰਕੇਤ',
        },
        addSymptom: {
            en: 'Add Symptom',
            hi: 'लक्षण जोड़ें',
            pa: 'ਲੱਛਣ ਜੋੜੋ',
        },
        listening: {
            en: 'Listening...',
            hi: 'सुन रहा है...',
            pa: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
        },
        noSymptoms: {
            en: 'No symptoms added yet',
            hi: 'अभी कोई लक्षण नहीं जोड़े गए हैं',
            pa: 'ਹਾਲੇ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਜੋੜੇ ਗਏ',
        },
        healthInsights: {
            en: 'AI Health Insights',
            hi: 'AI स्वास्थ्य जानकारी',
            pa: 'AI ਸਿਹਤ ਜਾਣਕਾਰੀ',
        },
        confidence: {
            en: 'Confidence',
            hi: 'विश्वास',
            pa: 'ਭਰੋਸਾ',
        },
        recommendation: {
            en: 'Recommendation',
            hi: 'सिफारिश',
            pa: 'ਸਿਫਾਰਸ਼',
        },
        advice: {
            en: 'Medical Advice',
            hi: 'चिकित्सा सलाह',
            pa: 'ਡਾਕਟਰੀ ਸਲਾਹ',
        },
        newAnalysis: {
            en: 'Start New Analysis',
            hi: 'नया विश्लेषण शुरू करें',
            pa: 'ਨਵਾਂ ਵਿਸ਼ਲੇਸ਼ਣ ਸ਼ੁਰੂ ਕਰੋ',
        }
    };

    // Font mapping
    const fontMap = {
        en: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        hi: "'Inter', 'Noto Sans Devanagari', sans-serif",
        pa: "'Inter', 'Noto Sans Gurmukhi', sans-serif",
    };

    // Enhanced symptom vocabulary
    const symptomVocabulary = [
        'fever', 'cough', 'fatigue', 'headache', 'sore throat', 'runny nose',
        'sneezing', 'chest pain', 'shortness of breath', 'nausea', 'vomiting',
        'diarrhea', 'stomach pain', 'joint pain', 'muscle aches', 'dizziness',
        'rash', 'swelling', 'loss of appetite', 'weight loss', 'insomnia',
        'anxiety', 'depression', 'back pain', 'knee pain', 'neck pain',
        'eye pain', 'ear ache', 'toothache', 'constipation', 'bloating',
        'palpitations', 'sweating', 'chills', 'confusion', 'memory loss'
    ];

    // Professional disease database
    const diseases = [
        {
            name: {
                en: 'Viral Upper Respiratory Infection',
                hi: 'वायरल श्वसन संक्रमण',
                pa: 'ਵਾਇਰਲ ਸਾਹ ਦੀ ਲਾਗ',
            },
            symptoms: ['runny nose', 'sneezing', 'sore throat', 'cough', 'fatigue'],
            severity: 'mild',
            category: 'Respiratory',
            recommendation: {
                en: 'Home care with monitoring',
                hi: 'निगरानी के साथ घरेलू देखभाल',
                pa: 'ਨਿਗਰਾਨੀ ਨਾਲ ਘਰੇਲੂ ਦੇਖਭਾਲ',
            },
            advice: {
                en: 'Rest, hydration, symptom monitoring for 7-10 days',
                hi: '7-10 दिनों तक आराम, हाइड्रेशन, लक्षण निगरानी',
                pa: '7-10 ਦਿਨਾਂ ਤੱਕ ਆਰਾਮ, ਪਾਣੀ, ਲੱਛਣ ਨਿਗਰਾਨੀ',
            },
        },
        {
            name: {
                en: 'Influenza Syndrome',
                hi: 'इन्फ्लूएंजा सिंड्रोम',
                pa: 'ਫਲੂ ਸਿੰਡਰੋਮ',
            },
            symptoms: ['fever', 'cough', 'fatigue', 'headache', 'muscle aches', 'chills'],
            severity: 'moderate',
            category: 'Systemic Viral',
            recommendation: {
                en: 'Medical consultation recommended',
                hi: 'चिकित्सा परामर्श की सिफारिश',
                pa: 'ਡਾਕਟਰੀ ਸਲਾਹ ਦੀ ਸਿਫਾਰਸ਼',
            },
            advice: {
                en: 'Antiviral therapy consideration, symptom management',
                hi: 'एंटीवायरल थेरेपी विचार, लक्षण प्रबंधन',
                pa: 'ਐਂਟੀਵਾਇਰਲ ਇਲਾਜ ਵਿਚਾਰ, ਲੱਛਣ ਪ੍ਰਬੰਧਨ',
            },
        },
        {
            name: {
                en: 'Acute Gastroenteritis',
                hi: 'तीव्र गैस्ट्रोएंटेराइटिस',
                pa: 'ਤੀਬਰ ਪੇਟ ਦੀ ਸੋਜ',
            },
            symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach pain', 'fever', 'fatigue'],
            severity: 'moderate',
            category: 'Gastrointestinal',
            recommendation: {
                en: 'Hydration priority, medical evaluation if severe',
                hi: 'हाइड्रेशन प्राथमिकता, गंभीर होने पर चिकित्सा मूल्यांकन',
                pa: 'ਪਾਣੀ ਦੀ ਪ੍ਰਾਥਮਿਕਤਾ, ਗੰਭੀਰ ਹੋਵੇ ਤਾਂ ਡਾਕਟਰੀ ਜਾਂਚ',
            },
            advice: {
                en: 'ORS, BRAT diet, gradual food reintroduction',
                hi: 'ORS, BRAT आहार, धीरे-धीरे भोजन शुरू करना',
                pa: 'ORS, BRAT ਖਾਣਾ, ਹੌਲੀ-ਹੌਲੀ ਭੋਜਨ ਸ਼ੁਰੂ ਕਰਨਾ',
            },
        },
        {
            name: {
                en: 'Acute Coronary Syndrome',
                hi: 'तीव्र कोरोनरी सिंड्रोम',
                pa: 'ਤੀਬਰ ਦਿਲ ਦਾ ਸਿੰਡਰੋਮ',
            },
            symptoms: ['chest pain', 'shortness of breath', 'nausea', 'sweating', 'dizziness'],
            severity: 'emergency',
            category: 'Cardiovascular Emergency',
            recommendation: {
                en: 'IMMEDIATE EMERGENCY CARE - Call 911',
                hi: 'तत्काल आपातकालीन देखभाल - 911 कॉल करें',
                pa: 'ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਕੇਅਰ - 911 ਕਾਲ ਕਰੋ',
            },
            advice: {
                en: 'Do not delay - activate emergency medical services',
                hi: 'देर न करें - आपातकालीन चिकित्सा सेवाएं सक्रिय करें',
                pa: 'ਦੇਰ ਨਾ ਕਰੋ - ਐਮਰਜੈਂਸੀ ਮੈਡੀਕਲ ਸੇਵਾਵਾਂ ਸਰਗਰਮ ਕਰੋ',
            },
        },
    ];

    // Enhanced TensorFlow model creation
    const createAdvancedModel = async () => {
        try {
            setIsModelLoading(true);

            const model = tf.sequential({
                layers: [
                    tf.layers.dense({
                        inputShape: [symptomVocabulary.length + 4],
                        units: 128,
                        activation: 'relu',
                        kernelInitializer: 'glorotUniform'
                    }),
                    tf.layers.dropout({ rate: 0.3 }),
                    tf.layers.dense({
                        units: 64,
                        activation: 'relu',
                        kernelInitializer: 'glorotUniform'
                    }),
                    tf.layers.dropout({ rate: 0.2 }),
                    tf.layers.dense({
                        units: 32,
                        activation: 'relu'
                    }),
                    tf.layers.dense({
                        units: diseases.length,
                        activation: 'softmax'
                    })
                ]
            });

            model.compile({
                optimizer: tf.train.adam(0.001),
                loss: 'categoricalCrossentropy',
                metrics: ['accuracy']
            });

            const { xs, ys } = generateEnhancedTrainingData();

            console.log('Training advanced TensorFlow model...');
            const history = await model.fit(xs, ys, {
                epochs: 20,
                batchSize: 32,
                validationSplit: 0.2,
                shuffle: true,
                verbose: 0,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        if (epoch % 20 === 0) {
                            console.log(`Epoch ${epoch}: accuracy = ${(logs.acc * 100).toFixed(2)}%`);
                            setModelAccuracy(Math.round(logs.acc * 100));
                        }
                    }
                }
            });

            setModel(model);
            setModelAccuracy(Math.round(history.history.acc[history.history.acc.length - 1] * 100));
            setIsModelLoading(false);

            xs.dispose();
            ys.dispose();

        } catch (error) {
            console.error('Error creating model:', error);
            setIsModelLoading(false);
        }
    };

    // Enhanced training data generation
    const generateEnhancedTrainingData = () => {
        const numSamples = 1500;
        const inputData = [];
        const outputData = [];

        for (let i = 0; i < numSamples; i++) {
            const symptomVector = new Array(symptomVocabulary.length).fill(0);
            const diseaseIndex = Math.floor(Math.random() * diseases.length);
            const disease = diseases[diseaseIndex];

            disease.symptoms.forEach(symptom => {
                const vocabIndex = symptomVocabulary.indexOf(symptom);
                if (vocabIndex !== -1 && Math.random() > 0.15) {
                    symptomVector[vocabIndex] = 1;
                }
            });

            // Add correlated symptoms
            if (symptomVector[symptomVocabulary.indexOf('fever')] === 1) {
                if (Math.random() > 0.4) {
                    const fatigueIndex = symptomVocabulary.indexOf('fatigue');
                    if (fatigueIndex !== -1) symptomVector[fatigueIndex] = 1;
                }
            }

            const severity = disease.severity;
            let temp, hr, bp, weight;

            if (severity === 'emergency') {
                temp = 0.7 + Math.random() * 0.3;
                hr = 0.8 + Math.random() * 0.2;
                bp = 0.8 + Math.random() * 0.2;
            } else if (severity === 'moderate') {
                temp = 0.5 + Math.random() * 0.3;
                hr = 0.6 + Math.random() * 0.3;
                bp = 0.5 + Math.random() * 0.3;
            } else {
                temp = 0.3 + Math.random() * 0.4;
                hr = 0.4 + Math.random() * 0.4;
                bp = 0.4 + Math.random() * 0.4;
            }
            weight = 0.5 + (Math.random() - 0.5) * 0.2;

            const input = [...symptomVector, temp, hr, bp, weight];
            const output = new Array(diseases.length).fill(0);
            output[diseaseIndex] = 1;

            inputData.push(input);
            outputData.push(output);
        }

        return {
            xs: tf.tensor2d(inputData),
            ys: tf.tensor2d(outputData)
        };
    };

    const prepareModelInput = (symptoms, vitals) => {
        const symptomVector = new Array(symptomVocabulary.length).fill(0);

        symptoms.forEach(symptom => {
            const normalizedSymptom = symptom.toLowerCase().trim();
            const vocabIndex = symptomVocabulary.findIndex(vocab =>
                normalizedSymptom.includes(vocab) || vocab.includes(normalizedSymptom)
            );
            if (vocabIndex !== -1) {
                symptomVector[vocabIndex] = 1;
            }
        });

        const temp = vitals.temperature ?
            Math.max(0, Math.min(1, (parseFloat(vitals.temperature) - 96) / 12)) : 0.5;
        const hr = vitals.heartRate ?
            Math.max(0, Math.min(1, (parseFloat(vitals.heartRate) - 50) / 130)) : 0.5;
        const bp = vitals.bloodPressure ?
            Math.max(0, Math.min(1, (parseFloat(vitals.bloodPressure) - 90) / 90)) : 0.5;
        const weight = vitals.weight ?
            Math.max(0, Math.min(1, (parseFloat(vitals.weight) - 100) / 200)) : 0.5;

        return [...symptomVector, temp, hr, bp, weight];
    };

    useEffect(() => {
        createAdvancedModel();
    }, []);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;

            let langCode = 'en-US';
            if (fontLanguage === 'hi') langCode = 'hi-IN';
            if (fontLanguage === 'pa') langCode = 'pa-IN';
            recognitionRef.current.lang = langCode;

            recognitionRef.current.onresult = (e) => setCurrentSymptom(e.results[0][0].transcript);
            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, [fontLanguage]);

    const startListening = () => {
        if (recognitionRef.current) {
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const validateVitals = (field, value) => {
        let error = '';
        const ranges = {
            temperature: { min: 92, max: 110, unit: '°F' },
            heartRate: { min: 40, max: 180, unit: 'bpm' },
            bloodPressure: { min: 80, max: 200, unit: 'mmHg' },
            weight: { min: 50, max: 500, unit: 'lbs' }
        };

        if (value !== '' && !isNaN(value)) {
            const range = ranges[field];
            if (range && (value < range.min || value > range.max)) {
                error = `Enter valid ${field} (${range.min}-${range.max} ${range.unit})`;
            }
        }
        setVitalErrors(prev => ({ ...prev, [field]: error }));
    };

    const addSymptom = () => {
        const clean = currentSymptom.trim().toLowerCase();
        if (clean && !symptoms.includes(clean)) {
            setSymptoms([...symptoms, clean]);
            setCurrentSymptom('');
        }
    };

    const analyzeSymptoms = async () => {
        if (symptoms.length === 0 || !model) return;

        setIsAnalyzing(true);
        setShowResults(false);

        try {
            const modelInput = prepareModelInput(symptoms, vitals);
            const inputTensor = tf.tensor2d([modelInput]);

            const prediction = model.predict(inputTensor);
            const probabilities = await prediction.data();

            const results = diseases.map((disease, index) => ({
                ...disease,
                confidence: Math.round(probabilities[index] * 100),
                aiPowered: true
            }))
                .filter(result => result.confidence > 5)
                .sort((a, b) => b.confidence - a.confidence)
                .slice(0, 4);

            inputTensor.dispose();
            prediction.dispose();

            setTimeout(() => {
                setPredictions(results);
                setIsAnalyzing(false);
                setShowResults(true);
            }, 2000);

        } catch (error) {
            console.error('Error during analysis:', error);
            setIsAnalyzing(false);
        }
    };

    const getSeverityColor = (severity) => {
        const colors = {
            mild: 'from-green-50 to-emerald-100 border-green-200 text-green-800',
            moderate: 'from-yellow-50 to-amber-100 border-yellow-200 text-yellow-800',
            severe: 'from-orange-50 to-red-100 border-orange-200 text-orange-800',
            emergency: 'from-red-100 to-red-200 border-red-300 text-red-900'
        };
        return colors[severity] || 'from-gray-50 to-gray-100 border-gray-200 text-gray-800';
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'mild': return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'moderate': return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'severe': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
            case 'emergency': return <AlertTriangle className="w-5 h-5 text-red-600" />;
            default: return <Activity className="w-5 h-5" />;
        }
    };

    const toggleFontLanguage = () => {
        setFontLanguage(prev => prev === 'en' ? 'hi' : prev === 'hi' ? 'pa' : 'en');
    };

    // Loading screen
    if (isModelLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="relative">
                        <div className="w-32 h-32 border-4 border-white/20 rounded-full animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-32 h-32 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-bold mt-8 mb-2">Initializing HealthAI Pro</h2>
                    <p className="text-xl text-white/80 mb-4">Training Advanced Neural Networks...</p>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>TensorFlow.js • Deep Learning • Medical AI</span>
                    </div>
                    <div className="mt-6 text-sm text-white/60">
                        Model Accuracy: {modelAccuracy}%
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
            style={{ fontFamily: fontMap[fontLanguage] }}
        >
            {/* Professional Header */}
            <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">{translations.appName[fontLanguage]}</h1>
                                    <p className="text-xs text-gray-600">AI-Powered Health Analysis</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {model && (
                                <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-green-700 font-medium">AI Model Active ({modelAccuracy}%)</span>
                                </div>
                            )}
                            <button
                                onClick={toggleFontLanguage}
                                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                {fontLanguage === 'en' ? '🇮🇳 हिंदी' : fontLanguage === 'hi' ? '🏳️ ਪੰਜਾਬੀ' : '🇬🇧 English'}
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Professional Hero Section */}
                {!showResults && (
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{translations.tagline[fontLanguage]}</h2>
                        <div className="flex items-center justify-center space-x-2 mb-8">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-600 text-sm">{translations.disclaimer[fontLanguage]}</span>
                        </div>
                    </div>
                )}

                {/* Tab Navigation */}
                {!showResults && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('symptoms')}
                                className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center space-x-2 ${activeTab === 'symptoms'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Activity className="w-4 h-4" />
                                <span>{translations.symptoms[fontLanguage]}</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('vitals')}
                                className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center space-x-2 ${activeTab === 'vitals'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Heart className="w-4 h-4" />
                                <span>{translations.vitals[fontLanguage]}</span>
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            {activeTab === 'symptoms' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{translations.describeSymptoms[fontLanguage]}</h3>
                                        <div className="flex gap-3 mb-6">
                                            <input
                                                type="text"
                                                value={currentSymptom}
                                                onChange={(e) => setCurrentSymptom(e.target.value)}
                                                placeholder={translations.symptomInputPlaceholder[fontLanguage]}
                                                className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                                onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                                            />
                                            <button
                                                onClick={isListening ? stopListening : startListening}
                                                className={`p-4 rounded-xl transition-all duration-200 ${isListening
                                                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                                                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
                                                    }`}
                                            >
                                                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                                            </button>
                                            <button
                                                onClick={addSymptom}
                                                className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors shadow-md"
                                            >
                                                <Plus className="w-6 h-6" />
                                            </button>
                                        </div>

                                        {isListening && (
                                            <div className="text-center mb-6">
                                                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
                                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                                                    <span className="text-blue-700 font-medium">{translations.listening[fontLanguage]}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-4">{translations.currentSymptoms[fontLanguage]}</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {symptoms.map((symptom, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-sm font-medium shadow-sm"
                                                    >
                                                        {symptom}
                                                        <button
                                                            onClick={() => setSymptoms(symptoms.filter((_, i) => i !== index))}
                                                            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </span>
                                                ))}
                                                {symptoms.length === 0 && (
                                                    <p className="text-gray-500 italic">{translations.noSymptoms[fontLanguage]}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'vitals' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{translations.vitalSigns[fontLanguage]}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Thermometer className="w-4 h-4 inline mr-2" />
                                                {translations.temperatureLabel[fontLanguage]}
                                            </label>
                                            <input
                                                type="number"
                                                value={vitals.temperature}
                                                onChange={(e) => {
                                                    setVitals({ ...vitals, temperature: e.target.value });
                                                    validateVitals('temperature', e.target.value);
                                                }}
                                                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${vitalErrors.temperature ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder={translations.temperaturePlaceholder[fontLanguage]}
                                            />
                                            {vitalErrors.temperature && (
                                                <p className="text-red-600 text-sm mt-1">{translations.temperatureError[fontLanguage]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Heart className="w-4 h-4 inline mr-2" />
                                                {translations.heartRateLabel[fontLanguage]}
                                            </label>
                                            <input
                                                type="number"
                                                value={vitals.heartRate}
                                                onChange={(e) => {
                                                    setVitals({ ...vitals, heartRate: e.target.value });
                                                    validateVitals('heartRate', e.target.value);
                                                }}
                                                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${vitalErrors.heartRate ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder={translations.heartRatePlaceholder[fontLanguage]}
                                            />
                                            {vitalErrors.heartRate && (
                                                <p className="text-red-600 text-sm mt-1">{translations.heartRateError[fontLanguage]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <TrendingUp className="w-4 h-4 inline mr-2" />
                                                {translations.bloodPressureLabel[fontLanguage]}
                                            </label>
                                            <input
                                                type="number"
                                                value={vitals.bloodPressure}
                                                onChange={(e) => {
                                                    setVitals({ ...vitals, bloodPressure: e.target.value });
                                                    validateVitals('bloodPressure', e.target.value);
                                                }}
                                                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${vitalErrors.bloodPressure ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder={translations.bloodPressurePlaceholder[fontLanguage]}
                                            />
                                            {vitalErrors.bloodPressure && (
                                                <p className="text-red-600 text-sm mt-1">{translations.bloodPressureError[fontLanguage]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <User className="w-4 h-4 inline mr-2" />
                                                {translations.weightLabel[fontLanguage]}
                                            </label>
                                            <input
                                                type="number"
                                                value={vitals.weight}
                                                onChange={(e) => {
                                                    setVitals({ ...vitals, weight: e.target.value });
                                                    validateVitals('weight', e.target.value);
                                                }}
                                                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${vitalErrors.weight ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder={translations.weightPlaceholder[fontLanguage]}
                                            />
                                            {vitalErrors.weight && (
                                                <p className="text-red-600 text-sm mt-1">{translations.weightError[fontLanguage]}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Analyze Button */}
                {!showResults && (
                    <div className="text-center">
                        <button
                            onClick={analyzeSymptoms}
                            disabled={isAnalyzing || symptoms.length === 0 || !model}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-semibold py-4 px-12 rounded-2xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                            {isAnalyzing ? (
                                <div className="flex items-center space-x-3">
                                    <Brain className="w-6 h-6 animate-pulse" />
                                    <span>{translations.analyzing[fontLanguage]}</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <BarChart3 className="w-6 h-6" />
                                    <span>{translations.analyze[fontLanguage]}</span>
                                </div>
                            )}
                        </button>
                        {symptoms.length === 0 && (
                            <p className="text-gray-500 text-sm mt-4">Please add at least one symptom to proceed</p>
                        )}
                    </div>
                )}

                {/* Professional Results Section */}
                {showResults && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">{translations.healthInsights[fontLanguage]}</h2>
                            <p className="text-gray-600 text-lg">AI-powered analysis based on your symptoms and vitals</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {predictions.map((result, index) => {
                                const getField = (field) => {
                                    if (typeof result[field] === 'object') {
                                        return result[field][fontLanguage];
                                    }
                                    return result[field];
                                };

                                return (
                                    <div
                                        key={index}
                                        className={`rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 bg-gradient-to-br ${getSeverityColor(result.severity)}`}
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="text-2xl font-bold">{getField('name')}</h3>
                                                    {getSeverityIcon(result.severity)}
                                                </div>
                                                <div className="flex items-center space-x-2 mb-4">
                                                    {result.aiPowered && (
                                                        <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                                                            AI POWERED
                                                        </span>
                                                    )}
                                                    <span className="px-3 py-1 bg-white/50 text-xs font-semibold rounded-full">
                                                        {result.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{translations.confidence[fontLanguage]}:</span>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-32 bg-white/30 rounded-full h-2">
                                                        <div
                                                            className="bg-current h-2 rounded-full transition-all duration-1000"
                                                            style={{ width: `${result.confidence}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="font-bold text-lg">{result.confidence}%</span>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium mb-2">{translations.recommendation[fontLanguage]}:</p>
                                                <p className="font-semibold text-lg">{getField('recommendation')}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium mb-2">{translations.advice[fontLanguage]}:</p>
                                                <p className="text-sm leading-relaxed">{getField('advice')}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {predictions.length === 0 && (
                            <div className="text-center py-16">
                                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 text-xl">No confident predictions found based on the provided symptoms.</p>
                                <p className="text-gray-500 mt-2">Please consult with a healthcare professional for proper evaluation.</p>
                            </div>
                        )}

                        <div className="text-center pt-8 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowResults(false);
                                    setPredictions([]);
                                    setSymptoms([]);
                                    setVitals({ temperature: '', heartRate: '', bloodPressure: '', weight: '' });
                                    setActiveTab('symptoms');
                                }}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                            >
                                {translations.newAnalysis[fontLanguage]}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Brain className="w-8 h-8 text-blue-400" />
                        <h3 className="text-2xl font-bold">{translations.appName[fontLanguage]}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">Powered by TensorFlow.js & Advanced Machine Learning</p>
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                        <span>Model Accuracy: {modelAccuracy}%</span>
                        <span>•</span>
                        <span>Neural Network Architecture</span>
                        <span>•</span>
                        <span>Multi-language Support</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SymptomCheckerApp;
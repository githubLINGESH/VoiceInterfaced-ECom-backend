import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Pause,
  PlayCircle,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';

const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'ta-IN', name: 'Tamil' }
];

const VOICE_COMMANDS = {
  SEARCH: ['search for', 'find', 'look for', 'show me'],
  CART: ['add to cart', 'buy', 'purchase'],
  NAVIGATION: ['go to', 'open', 'show'],
  HELP: ['help', 'what can i say', 'commands']
};

const VoicePage = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("Click the microphone to start");
    const [isListening, setIsListening] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [language, setLanguage] = useState('en-US');
    const [searchResults, setSearchResults] = useState([]);
    const [showCommands, setShowCommands] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const recognitionRef = useRef(null);
    const socketRef = useRef(null);

    const initializeRecognition = () => {
        if (!('webkitSpeechRecognition' in window)) {
            setStatus('Speech recognition not supported in this browser.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onstart = () => {
            setStatus("Listening...");
            speak("I'm listening. How can I help you shop today?");
        };

        recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript.trim().toLowerCase();
            
            if (result.isFinal) {
                setStatus(`You said: ${transcript}`);
                processUserInput(transcript);
            }
        };

        recognition.onerror = (event) => {
            setStatus(`Error: ${event.error}`);
            speak("Sorry, I encountered an error. Please try again.");
        };

        recognition.onend = () => {
            if (isListening && !isPaused) {
                recognition.start();
            }
        };

        recognitionRef.current = recognition;
    };

    const speak = (text) => {
        if (!isMuted) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        initializeRecognition();
        
        socketRef.current = io(process.env.REACT_APP_BACKEND_URL);
        
        socketRef.current.on('connect', () => {
            console.log('Connected to server');
        });

        socketRef.current.on('searchResults', (products) => {
            setSearchResults(products);
            const resultCount = products.length;
            speak(`Found ${resultCount} products for you`);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [language]);

    const processUserInput = (transcript) => {
        // Handle help command
        if (VOICE_COMMANDS.HELP.some(cmd => transcript.includes(cmd))) {
            setShowCommands(true);
            speak("Here are the commands you can use");
            return;
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/llm/prompted-res`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ userInput: transcript, language })
        })
        .then(response => response.json())
        .then(data => {
            speak(data.Response);
        })
        .catch(error => {
            console.error('Error:', error);
            speak("Sorry, I couldn't process that request");
        });
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

    const handleAddToCartClick = (product) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add-to-cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ products: product })
        }).then((response) => {
            if (response.ok) {
                speak("Added to cart successfully");
                navigate("/cart/");
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Voice Interface Panel */}
            <div className="voice-interface mb-8">
                <div className="flex justify-between items-center mb-4">
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-3 py-2 rounded border border-gray-200"
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                    
                    <button
                        onClick={() => setShowCommands(!showCommands)}
                        className="voice-button"
                    >
                        <HelpCircle className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        className={`voice-button ${isListening ? 'listening' : ''}`}
                        onClick={() => {
                            if (isListening) {
                                recognitionRef.current?.stop();
                                setIsListening(false);
                            } else {
                                recognitionRef.current?.start();
                                setIsListening(true);
                            }
                            setIsPaused(false);
                        }}
                    >
                        {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>

                    <button
                        className="voice-button"
                        onClick={() => {
                            setIsPaused(!isPaused);
                            if (!isPaused) {
                                recognitionRef.current?.stop();
                            } else {
                                recognitionRef.current?.start();
                            }
                        }}
                        disabled={!isListening}
                    >
                        {isPaused ? <PlayCircle className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                    </button>

                    <button
                        className="voice-button"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                </div>

                <div className="status">{status}</div>

                {showCommands && (
                    <div className="mt-4 p-4 bg-white rounded-lg shadow">
                        <h3 className="font-medium mb-2">Voice Commands</h3>
                        <ul className="space-y-2 text-sm">
                            <li>"Search for [product]"</li>
                            <li>"Add [product] to cart"</li>
                            <li>"Show me [category]"</li>
                            <li>"What can I say?"</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchResults.map((product) => (
                        <div 
                            key={product.id}
                            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                        >
                            <div 
                                className="cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            >
                                <img 
                                    src={product.imageUrl || '/api/placeholder/200/200'} 
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded mb-2"
                                />
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-gray-600">${product.price}</p>
                            </div>
                            <button
                                onClick={() => handleAddToCartClick(product)}
                                className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VoicePage;
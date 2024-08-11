import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import './voiceinterface.css';
import ProductCard from 'components/prodCard';
import { useNavigate } from 'react-router-dom';

const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'ta-IN', name: 'Tamil' }
];


const VoicePage = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("Click the button to start");
    const [isListening, setIsListening] = useState(false);
    const [language, setLanguage] = useState('en-US');
    const [searchResults, setSearchResults] = useState([]);
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    const initializeRecognition = () => {
        if (!('webkitSpeechRecognition' in window)) {
            setStatus('Speech recognition not supported in this browser.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = language;

        recognition.onstart = () => {
            setStatus("Listening...");
            console.log("Speech recognition started.");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            setStatus(`You said: ${transcript}`);
            console.log("Transcript received: ", transcript);
            processUserInput(transcript);
        };

        recognition.onerror = (event) => {
            setStatus(`Error occurred: ${event.error}`);
            console.error("Speech recognition error: ", event.error);
        };

        recognition.onend = () => {
            setStatus("Stopped listening.");
            console.log("Speech recognition stopped.");
        };

        recognitionRef.current = recognition;
    };

    useEffect(() => {
        initializeRecognition();
    }, [language]);

    const startListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsListening(true);
            console.log("Started listening...");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            console.log("Stopped listening...");
        }
    };

    const pauseListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            setStatus("Paused listening.");
            console.log("Paused listening...");
        }
    };

    const processUserInput = (transcript) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/llm/prompted-res`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ userInput: transcript, language })
        })
        .then(response => response.json())
        .then(data => {
            const utterance = new SpeechSynthesisUtterance(data.Response);
            speechSynthesis.speak(utterance);
        })
        .catch(error => {
            console.error('Error processing input:', error);
        });
    };

    // Connect to Socket.IO
    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);
        
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('searchResults', (products) => {
            setSearchResults(products);
            console.log("Here are some products", products);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        if (recognitionRef.current) {
            recognitionRef.current.lang = e.target.value;
        }
    };

    const handleAddToCartClick = (product) => {
        //setSelectedProduct(product);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add-to-cart`,{
        method: "POST",
        headers:{
            "Content-type" : "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({products : product})

        }).then((response) =>{
        if(response.ok){
            console.log("Added Successfully");
            navigate("/cart/");
        }
        });
    };

    const handleProductClick = (product) => {
        //setSelectedProduct(product);
        navigate(`/product/${product.id}`,{state:{product}});
    };

    return (
        <div className="voice-page flex flex-col items-center p-6">
            <div className="w-full flex justify-between items-center mb-4">
                <label htmlFor="language">Select Language:</label>
                <select id="language" value={language} onChange={handleLanguageChange} className="ml-2 p-2 rounded border">
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-2 mb-4">
                <button className="voice-button" onClick={startListening} disabled={isListening}>
                    <FontAwesomeIcon icon={faMicrophone} size="2x" />
                </button>
                <button className="voice-button" onClick={stopListening} disabled={!isListening}>
                    <FontAwesomeIcon icon={faStop} size="2x" />
                </button>
                <button className="voice-button" onClick={pauseListening} disabled={!isListening}>
                    <FontAwesomeIcon icon={faPause} size="2x" />
                </button>
            </div>

            <div className="status text-center p-2 rounded bg-gray-200 w-full mb-4">{status}</div>

            {searchResults.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
                    {searchResults.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={handleProductClick}
                            onAddToCartClick={handleAddToCartClick}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default VoicePage;

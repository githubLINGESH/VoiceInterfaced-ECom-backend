import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import './voiceInterface.css';

const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'ta-IN', name: 'Tamil' }
];

const VoiceInterface = ({ isVoice }) => {
    const [status, setStatus] = useState("Click the button to start");
    const [isListening, setIsListening] = useState(false);
    const [language, setLanguage] = useState('en-US');
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

        recognition.onresult = (event) => { // as soon as recognitionRef.current.stop() occurs this action is triggered
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
            recognitionRef.current.start(); //microphone is started and .onstart() event is triggered
            setIsListening(true);
            console.log("Started listening...");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop(); //microphone is stopped and .onresult() event is triggered
            setIsListening(false);
            console.log("Stopped listening...");
        }
    };

    const pauseListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop(); //microphone is paused and .onresult() event is triggered
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
            body: JSON.stringify({ userInput: transcript, language: language })
        })
            .then(response => response.json())
            .then(data => {
                const utterance = new SpeechSynthesisUtterance(data.Response);
                speechSynthesis.speak(utterance);
                // onSelect(data.response);  // Use the onSelect prop
            })
            .catch(error => {
                console.error('Error processing input:', error);
            });
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        if (recognitionRef.current) {
            recognitionRef.current.lang = e.target.value;
        }
    };

    if (!isVoice) {
        return null;
    }

    return (
        <div className="fixed inset-y-0 right-0 bg-whitesmoke-100 z-50 w-full sm:w-96 p-4">
            <div className="voice-interface flex flex-col items-center space-y-4">
                <div className="w-full flex justify-between items-center">
                    <label htmlFor="language">Select Language:</label>
                    <select id="language" value={language} onChange={handleLanguageChange} className="ml-2 p-2 rounded border">
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex space-x-2">
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
                <div className="status text-center p-2 rounded bg-gray-200 w-full">{status}</div>
            </div>
        </div>
    );
};

export default VoiceInterface;

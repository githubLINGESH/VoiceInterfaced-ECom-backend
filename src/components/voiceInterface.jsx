import React, { useState, useRef } from 'react';
import './css/voiceInterface.css';

const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'ta-IN', name: 'Tamil'}
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

    const startListening = () => {
        if (!recognitionRef.current) {
            initializeRecognition();
        }
        recognitionRef.current.start();
        setIsListening(true);
        console.log("Started listening...");
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
        console.log("Stopped listening...");
    };

    const pauseListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
        setStatus("Paused listening.");
        console.log("Paused listening...");
    };

    const processUserInput = (transcript) => {
        fetch('http://localhost:3001/llm/prompted-res', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput: transcript , language : language})
        })
        .then(response => response.json())
        .then(data => {
            const utterance = new SpeechSynthesisUtterance(data.Response);
            speechSynthesis.speak(utterance);
            //onSelect(data.response);  // Use the onSelect prop
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

    if (!isVoice){
        return null;
    }

    return (
        <div className="fixed inset-y-0 right-0 bg-whitesmoke-100 z-50" style={{width:"305px"}}>
        <div className="voice-interface">
            <div>
                <label htmlFor="language">Select Language:</label>
                <select id="language" value={language} onChange={handleLanguageChange}>
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>
            <button className="voice-button" onClick={startListening} disabled={isListening}>Start</button>
            <button className="voice-button" onClick={stopListening} disabled={!isListening}>Stop</button>
            <button className="voice-button" onClick={pauseListening} disabled={!isListening}>Pause</button>
            <div id="status" className="status">{status}</div>
        </div>
        </div>
    );
};

export default VoiceInterface;

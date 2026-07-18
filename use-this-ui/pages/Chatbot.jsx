import React, { useState } from "react";
import "../styles/sid.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";

import {
    Bot,
    User,
    Send,
    Mic,
    ImagePlus,
    Globe,
    Leaf,
    Bug,
    CloudSun,
    Landmark,
    Droplets,
} from "lucide-react";

function Chatbot() {
    const [message, setMessage] = useState("");

    const messages = [
        {
            sender: "bot",
            text: "Hello! I'm AgriSmart AI. How can I help you today?",
        },
        {
            sender: "user",
            text: "Which crop grows well in black soil?",
        },
        {
            sender: "bot",
            text: "Cotton, soybean and sunflower grow very well in black soil because black soil retains moisture and is rich in minerals.",
        },
        {
            sender: "user",
            text: "Should I irrigate my rice today?",
        },
        {
            sender: "bot",
            text: "Rain is expected tomorrow. You can postpone irrigation for one day to conserve water.",
        },
    ];

    const suggestions = [
        {
            icon: <Leaf size={18} />,
            text: "Crop Advice",
        },
        {
            icon: <Bug size={18} />,
            text: "Disease",
        },
        {
            icon: <CloudSun size={18} />,
            text: "Weather",
        },
        {
            icon: <Landmark size={18} />,
            text: "Schemes",
        },
        {
            icon: <Droplets size={18} />,
            text: "Irrigation",
        },
    ];

    return (
        <>
            <Navbar />

            <div className="chatbotPage">

                {/* Header */}

                <div className="chatHeader">

                    <div>

                        <h1>AI Farming Assistant</h1>

                        <p>
                            Ask anything related to farming and receive intelligent,
                            AI-powered guidance.
                        </p>

                    </div>

                    <div className="languageSelector">

                        <Globe size={18} />

                        <select>

                            <option>English</option>

                            <option>தமிழ்</option>

                            <option>తెలుగు</option>

                            <option>हिन्दी</option>

                            <option>ಕನ್ನಡ</option>

                        </select>

                    </div>

                </div>


                {/* Chat Container */}

                <div className="chatContainer">

                    <div className="messages">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`message ${msg.sender === "bot"
                                        ? "botMessage"
                                        : "userMessage"
                                    }`}
                            >

                                {msg.sender === "bot" ? (

                                    <>
                                        <div className="messageIcon">
                                            <Bot size={22} />
                                        </div>

                                        <div className="messageBubble">
                                            {msg.text}
                                        </div>
                                    </>

                                ) : (

                                    <>
                                        <div className="messageBubble">
                                            {msg.text}
                                        </div>

                                        <div className="messageIcon">
                                            <User size={22} />
                                        </div>
                                    </>

                                )}

                            </div>

                        ))}

                    </div>

                    <div className="chatInputContainer">

                        <button className="inputIcon">
                            <ImagePlus size={22} />
                        </button>

                        <input
                            type="text"
                            placeholder="Ask anything about farming..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        <button className="inputIcon">
                            <Mic size={22} />
                        </button>

                        <button className="sendButton">
                            <Send size={20} />
                            Send
                        </button>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Chatbot;
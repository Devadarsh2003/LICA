import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "../css/Chat.css"; 
import NavBar from "../components/NavBar";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  const generateUserId = () => "user_" + Math.random().toString(36).substring(7);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userId = localStorage.getItem("user_id") || generateUserId();
    localStorage.setItem("user_id", userId);

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, user_id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Chatbot response:", data.response);
        const botMessage = { sender: "bot", text: formatMessage(data.response) };
        setMessages((prev) => [...prev, botMessage]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Error: Unable to connect." },
        ]);
      });

    setInput("");
  };

  const formatMessage = (text) => {
    return text
      .replace(/##\s?(.+)/g, `<h3>$1</h3>`) // Convert "## Title" into <h3> sections
      .replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`) // Bold for **text**
      .replace(/- (.+)/g, `<li>$1</li>`) // Convert "- item" into <li>
      .replace(/\[([^\]]+)]/g, `<span class="reference">[$1]</span>`); // Format references
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <NavBar />
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.sender}`}>
            <div className={`chat-bubble ${msg.sender}`}>
              <span
                className="chat-message"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="send-btn" onClick={handleSendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;

import { useState } from "react";

const StaticChatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Track if the chatbot is open or not
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);

  // Function to toggle chatbot open/close
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (message: any) => {
    // Add user's message to the chat
    setMessages([...messages, { sender: "user", text: message }]);

    // Here you can add API calls if needed
    const predefinedResponses: any = {
      hello: "Hi! How can I assist you today?",
      help: "I'm here to help! What do you need assistance with?",
      default: "Sorry, I didn't understand that.",
    };

    const botResponse =
      predefinedResponses[message?.toLowerCase()] ||
      predefinedResponses.default;
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
  };

  return (
    <div>
      {/* Chat Icon - Visible when chatbot is closed */}
      {!isOpen && (
        <div
          onClick={toggleChatbot}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            backgroundColor: "#007bff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "30px",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          💬
        </div>
      )}

      {/* Chatbot UI - Visible when open */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "400px",
            height: "600px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {/* Close button */}
          <div
            onClick={toggleChatbot}
            style={{
              textAlign: "right",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "#fff",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            ✖️
          </div>

          {/* Messages area */}
          <div style={{ height: "90%", padding: "10px", overflowY: "scroll" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  textAlign: msg.sender === "bot" ? "left" : "right",
                }}
              >
                <strong>{msg.sender === "bot" ? "Bot" : "You"}: </strong>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input field */}
          <input
            type="text"
            placeholder="Type a message..."
            onKeyDown={(e: any) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                handleSendMessage(e.target.value);
                e.target.value = ""; // Clear input
              }
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderTop: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StaticChatbot;

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hai! Saya Zaenal GPT. Ada yang bisa saya bantu?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: data.reply || "Maaf, terjadi kesalahan." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Terjadi kesalahan pada server." },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <div className="logo">
          <i className="fas fa-robot"></i>
          <h2>Zaenal GPT</h2>
        </div>
        <button className="new-chat">New Chat</button>
        <div className="history">
          <div className="history-item active">
            <i className="fas fa-comment"></i> Mulai Mengobrol
          </div>
        </div>
        <div className="footer">
          <div className="user">
            <i className="fas fa-user"></i> <span>User</span>
          </div>
        </div>
      </aside>

      <main className="chat-main">
        <header className="chat-header">
          <h3>Zaenal GPT</h3>
          <button
            className="clear"
            onClick={() => setMessages([])}
          >
            <i className="fas fa-trash"></i> Clear
          </button>
        </header>

        <div className="chat-body">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.from === "ai" ? "ai" : "user"}`}
            >
              <div className="avatar">
                <i
                  className={`fas ${
                    msg.from === "ai" ? "fa-robot" : "fa-user"
                  }`}
                ></i>
              </div>
              <div className="content">
                <p>{msg.text}</p>
                {msg.text.includes("```") && (
                  <button
                    className="copy-btn"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        msg.text.replace(/```/g, "")
                      )
                    }
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            rows="1"
          />
          <button onClick={sendMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        body, html, .chat-container {
          margin: 0;
          padding: 0;
          height: 100vh;
          background: #0e0e0e;
          color: #fff;
          display: flex;
        }
        .sidebar {
          width: 280px;
          background: #121212;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid #222;
          padding: 20px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.3rem;
          font-weight: 600;
        }
        .new-chat {
          margin-top: 20px;
          background: #1f1f1f;
          border: none;
          color: #fff;
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .new-chat:hover {
          background: #333;
        }
        .chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .chat-header {
          padding: 15px 20px;
          border-bottom: 1px solid #222;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #121212;
        }
        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: #0e0e0e;
        }
        .message {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .message.user .content {
          background: #1c1c1c;
        }
        .message.ai .content {
          background: #181818;
        }
        .content {
          padding: 12px 16px;
          border-radius: 10px;
          max-width: 70%;
          line-height: 1.5;
          position: relative;
        }
        .copy-btn {
          position: absolute;
          right: 10px;
          bottom: 10px;
          font-size: 0.8rem;
          background: #222;
          border: none;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          color: #bbb;
        }
        .chat-input {
          display: flex;
          padding: 15px 20px;
          border-top: 1px solid #222;
          background: #121212;
        }
        .chat-input textarea {
          flex: 1;
          resize: none;
          background: #1a1a1a;
          border: none;
          border-radius: 8px;
          padding: 10px;
          color: #fff;
        }
        .chat-input button {
          background: #1a1a1a;
          border: none;
          color: #fff;
          margin-left: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .chat-input button:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
}

import { useState, useRef } from "react";
import axios from "axios";
import { useTheme } from "./_app";

export default function ChatPage() {
  const { dark, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { prompt: input });
      const aiMsg = { from: "ai", text: res.data.response };
      setMessages(prev => [...prev, aiMsg]);
      setTimeout(() => chatRef.current.scrollTop = chatRef.current.scrollHeight, 100);
    } catch {
      setMessages(prev => [...prev, { from: "ai", text: "Terjadi kesalahan, coba lagi nanti." }]);
    }
  };

  const handleCopy = (text) => navigator.clipboard.writeText(text);

  return (
    <main style={{
      height: "100vh",
      background: dark ? "#0a0a0a" : "#fafafa",
      color: dark ? "#f1f1f1" : "#111",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      transition: "0.3s"
    }}>
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "none",
          border: "1px solid #333",
          borderRadius: "8px",
          color: dark ? "#fff" : "#111",
          padding: "6px 12px",
          cursor: "pointer"
        }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div ref={chatRef} style={{
        flex: 1,
        overflowY: "auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
            background: msg.from === "user"
              ? (dark ? "#1a1a1a" : "#ddd")
              : (dark ? "#222" : "#eee"),
            padding: "1rem",
            borderRadius: "10px",
            maxWidth: "75%",
            position: "relative"
          }}>
            <div>{msg.text}</div>
            {msg.from === "ai" && (
              <button onClick={() => handleCopy(msg.text)} style={{
                position: "absolute",
                bottom: 5,
                right: 8,
                background: "none",
                border: "none",
                color: dark ? "#888" : "#555",
                fontSize: "0.8rem",
                cursor: "pointer"
              }}>copy</button>
            )}
          </div>
        ))}
      </div>

      <div style={{
        padding: "1rem",
        borderTop: dark ? "1px solid #222" : "1px solid #ccc",
        display: "flex",
        gap: "0.5rem"
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tulis pesan..."
          style={{
            flex: 1,
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: dark ? "#111" : "#fff",
            color: dark ? "#fff" : "#111",
            outline: "none"
          }}
        />
        <button onClick={handleSend} style={{
          padding: "0.8rem 1.6rem",
          backgroundColor: dark ? "#1a1a1a" : "#e3e3e3",
          border: "1px solid #333",
          borderRadius: "8px",
          color: dark ? "#fff" : "#111",
          cursor: "pointer",
          fontWeight: "500"
        }}>Kirim</button>
      </div>
    </main>
  );
}

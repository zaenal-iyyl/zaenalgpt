import { useState, useRef } from "react";
import { useTheme } from "./_app";
import axios from "axios";

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
    } catch {
      setMessages(prev => [...prev, { from: "ai", text: "Terjadi kesalahan." }]);
    }
    setTimeout(() => chatRef.current?.scrollTo(0, chatRef.current.scrollHeight), 100);
  };

  const copyText = (txt) => navigator.clipboard.writeText(txt);

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: dark ? "#000" : "#fff",
      color: dark ? "#f1f1f1" : "#111",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      padding: "1rem"
    }}>
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "8px 14px",
          borderRadius: "8px",
          border: "1px solid #333",
          background: dark ? "#111" : "#f0f0f0",
          color: dark ? "#fff" : "#111",
          cursor: "pointer"
        }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div style={{ width: "100%", maxWidth: "700px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "600" }}>ZaenalGPT</h1>
        <div ref={chatRef} style={{
          flex: 1,
          height: "70vh",
          backgroundColor: dark ? "#0a0a0a" : "#f6f6f6",
          borderRadius: "12px",
          padding: "1rem",
          overflowY: "auto",
          border: `1px solid ${dark ? "#222" : "#ddd"}`
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              marginBottom: "0.7rem"
            }}>
              <div style={{
                backgroundColor: msg.from === "user" ? (dark ? "#1a1a1a" : "#e5e5e5") : (dark ? "#222" : "#f0f0f0"),
                color: msg.from === "user" ? "#fff" : (dark ? "#f1f1f1" : "#111"),
                padding: "1rem",
                borderRadius: "10px",
                maxWidth: "80%",
                position: "relative"
              }}>
                {msg.text}
                {msg.from === "ai" && (
                  <button
                    onClick={() => copyText(msg.text)}
                    style={{
                      position: "absolute",
                      right: "6px",
                      bottom: "6px",
                      background: "none",
                      border: "none",
                      color: dark ? "#888" : "#666",
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    copy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan..."
            style={{
              flex: 1,
              padding: "0.8rem",
              borderRadius: "8px",
              border: `1px solid ${dark ? "#333" : "#ccc"}`,
              backgroundColor: dark ? "#111" : "#fff",
              color: dark ? "#fff" : "#111",
              outline: "none"
            }}
          />
          <button onClick={handleSend} style={{
            padding: "0.8rem 1.6rem",
            backgroundColor: dark ? "#1a1a1a" : "#ddd",
            border: "1px solid #333",
            borderRadius: "8px",
            color: dark ? "#fff" : "#111",
            cursor: "pointer"
          }}>Kirim</button>
        </div>
      </div>
    </main>
  );
}

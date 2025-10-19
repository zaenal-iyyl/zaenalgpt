import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { prompt: input });
      const aiMsg = { from: "ai", text: res.data.response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Terjadi kesalahan. Coba lagi nanti." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d0d0d 0%, #000 100%)",
        color: "#f1f1f1",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Navbar kecil */}
      <header
        style={{
          padding: "1rem 2rem",
          borderBottom: "1px solid #222",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#0f0f0f",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h2 style={{ fontSize: "1.1rem", fontWeight: "600" }}>ZaenalGPT</h2>
        <p style={{ fontSize: "0.85rem", color: "#888" }}>Made by Zaenal</p>
      </header>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.from === "user" ? "#1a1a1a" : "#111",
              border: "1px solid #222",
              padding: "0.9rem 1rem",
              borderRadius: "10px",
              maxWidth: "70%",
              position: "relative",
            }}
          >
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{msg.text}</p>
            {msg.from === "ai" && (
              <button
                onClick={() => copyToClipboard(msg.text)}
                style={{
                  position: "absolute",
                  right: "6px",
                  bottom: "6px",
                  fontSize: "0.8rem",
                  background: "none",
                  border: "none",
                  color: "#777",
                  cursor: "pointer",
                }}
              >
                Copy
              </button>
            )}
          </div>
        ))}

        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#111",
              border: "1px solid #222",
              padding: "0.9rem 1rem",
              borderRadius: "10px",
              color: "#888",
              fontStyle: "italic",
              maxWidth: "70%",
            }}
          >
            Sedang menulis...
          </div>
        )}
      </div>

      
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          borderTop: "1px solid #222",
          padding: "1rem 2rem",
          backgroundColor: "#0f0f0f",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan..."
          style={{
            flex: 1,
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: "#111",
            color: "#fff",
            outline: "none",
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "0.8rem 1.6rem",
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Kirim
        </button>
      </div>
    </main>
  );
}

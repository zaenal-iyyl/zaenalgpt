import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => setFadeIn(true), []);

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
      setMessages(prev => [...prev, { from: "ai", text: "Terjadi kesalahan. Coba lagi nanti." }]);
    }
  };

  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 20% 20%, #111 0%, #000 100%)",
      color: "#f1f1f1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      opacity: fadeIn ? 1 : 0,
      transition: "opacity 1s ease-in-out"
    }}>
      
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        animation: "moveMesh 45s linear infinite",
        zIndex: 0
      }} />

      <style jsx>{`
        @keyframes moveMesh {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
      `}</style>

      <div style={{ zIndex: 1, width: "100%", maxWidth: "800px" }}>
        <h1 style={{
          fontSize: "2.2rem",
          fontWeight: "600",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}>
          ZaenalGPT
        </h1>

        <div style={{
          height: "70vh",
          backgroundColor: "#111",
          borderRadius: "12px",
          border: "1px solid #222",
          padding: "1rem",
          overflowY: "auto",
          marginBottom: "1rem"
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              margin: "0.8rem 0",
              display: "flex",
              justifyContent: msg.from === "user" ? "flex-end" : "flex-start"
            }}>
              <div style={{
                backgroundColor: msg.from === "user" ? "#1a1a1a" : "#222",
                color: "#f1f1f1",
                padding: "1rem",
                borderRadius: "10px",
                maxWidth: "80%",
                lineHeight: "1.6",
                position: "relative"
              }}>
                <pre style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  margin: 0
                }}>{msg.text}</pre>

                {msg.from === "ai" && msg.text.includes("```") && (
                  <button
                    onClick={() => copyToClipboard(msg.text)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: "none",
                      border: "1px solid #444",
                      color: "#999",
                      fontSize: "0.8rem",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Tulis pesan..."
            style={{
              flex: 1,
              padding: "1rem",
              borderRadius: "10px",
              border: "1px solid #333",
              backgroundColor: "#111",
              color: "#fff",
              outline: "none"
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "1rem 1.8rem",
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "10px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.2s"
            }}
            onMouseOver={e => e.target.style.backgroundColor = "#222"}
            onMouseOut={e => e.target.style.backgroundColor = "#1a1a1a"}
          >
            Kirim
          </button>
        </div>
      </div>
    </main>
  );
}

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

      
      const responseText =
        typeof res.data.response === "string"
          ? res.data.response
          : res.data.response_content ||
            res.data.message ||
            JSON.stringify(res.data);

      const aiMsg = { from: "ai", text: responseText };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Terjadi kesalahan. Coba lagi nanti." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 20% 20%, #0d0d0d 0%, #000 100%)",
        color: "#f1f1f1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      ></div>

      
      <div style={{ zIndex: 1, width: "100%", maxWidth: "850px" }}>
        <header
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700" }}>ZaenalGPT</h1>
          <p style={{ color: "#888", fontSize: "0.95rem" }}>
            AI Chat cerdas, cepat, dan gratis 100%
          </p>
        </header>

        <div
          style={{
            height: "70vh",
            backgroundColor: "#0f0f0f",
            borderRadius: "10px",
            border: "1px solid #1f1f1f",
            padding: "1rem",
            overflowY: "auto",
            marginBottom: "1rem",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                margin: "0.7rem 0",
                display: "flex",
                justifyContent:
                  msg.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor: msg.from === "user" ? "#1a1a1a" : "#191919",
                  border: "1px solid #222",
                  color: "#e8e8e8",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "10px",
                  maxWidth: "75%",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.5",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div
              style={{
                textAlign: "center",
                color: "#666",
                fontStyle: "italic",
                marginTop: "0.5rem",
              }}
            >
              Mengetik...
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            style={{
              flex: 1,
              padding: "0.9rem 1rem",
              borderRadius: "8px",
              border: "1px solid #222",
              backgroundColor: "#111",
              color: "#fff",
              outline: "none",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "0.9rem 1.6rem",
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#222")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1a1a1a")}
          >
            Kirim
          </button>
        </div>
      </div>
    </main>
  );
}

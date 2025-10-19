
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("/api/chat", { prompt: input });
      const aiMsg = { from: "ai", text: res.data.response };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [...prev, { from: "ai", text: "Terjadi kesalahan, coba lagi nanti." }]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #0b0b0b, #000)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <header
        style={{
          textAlign: "center",
          padding: "1rem",
          background: "#0a0a0a",
          borderBottom: "1px solid #1d1d1d",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: "1.4rem", fontWeight: 600, margin: 0 }}>ZaenalGPT</h1>
        <p style={{ fontSize: "0.9rem", color: "#888", marginTop: 4 }}>
          AI Chat cerdas, cepat, dan gratis 100%
        </p>
      </header>

      <div
        ref={chatRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.2rem",
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      >
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                marginBottom: "1.2rem",
              }}
            >
              <div
                style={{
                  backgroundColor: msg.from === "user" ? "#121212" : "#161616",
                  border: "1px solid #1f1f1f",
                  borderRadius:
                    msg.from === "user"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  padding: "1rem 1.4rem",
                  maxWidth: "80%",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                  position: "relative",
                  boxShadow:
                    msg.from === "ai"
                      ? "0 0 10px rgba(255,255,255,0.05)"
                      : "0 0 5px rgba(0,0,0,0.2)",
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                {msg.from === "ai" && (
                  <button
                    onClick={() => copyText(msg.text)}
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 8,
                      border: "none",
                      background: "transparent",
                      color: "#777",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                    }}
                  >
                    ⧉
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "1rem",
          background: "#0a0a0a",
          borderTop: "1px solid #1d1d1d",
          display: "flex",
          gap: "0.6rem",
          alignItems: "center",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Tulis pesan..."
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            borderRadius: "10px",
            border: "1px solid #222",
            backgroundColor: "#111",
            color: "#fff",
            padding: "0.9rem 1rem",
            fontSize: "1rem",
            outline: "none",
            height: "48px",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            background: loading ? "#111" : "#1a1a1a",
            border: "1px solid #333",
            color: "#fff",
            padding: "0.9rem 1.6rem",
            borderRadius: "10px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.3s",
            fontWeight: 500,
          }}
        >
          {loading ? "..." : "Kirim"}
        </button>
      </div>
    </div>
  );
}

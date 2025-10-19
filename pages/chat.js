import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll setiap pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
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
        { from: "ai", text: " Terjadi kesalahan. Coba lagi nanti." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Teks disalin!");
  };

  return (
    <main
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%)",
        color: "#f1f1f1",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
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

      
      <header
        style={{
          textAlign: "center",
          padding: "1.5rem 0",
          borderBottom: "1px solid #1f1f1f",
          fontWeight: "700",
          fontSize: "1.4rem",
          letterSpacing: "0.5px",
          background: "rgba(0,0,0,0.8)",
          zIndex: 1,
        }}
      >
        ZaenalGPT
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: "400",
            color: "#888",
            marginTop: "0.3rem",
          }}
        >
          AI Chat cerdas, cepat, dan gratis 100%
        </p>
      </header>

      
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
          zIndex: 1,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              margin: "0.7rem 0",
            }}
          >
            <div
              style={{
                backgroundColor: msg.from === "user" ? "#1a1a1a" : "#141414",
                padding: "0.9rem 1.1rem",
                borderRadius: "10px",
                maxWidth: "75%",
                lineHeight: "1.6",
                position: "relative",
                border: "1px solid #222",
              }}
            >
              {msg.text}
              {msg.from === "ai" && (
                <button
                  onClick={() => copyText(msg.text)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "transparent",
                    border: "none",
                    color: "#777",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                  title="Salin teks"
                >
                  ⧉
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      
      <div
        style={{
          padding: "1rem",
          borderTop: "1px solid #1f1f1f",
          background: "#0b0b0b",
          display: "flex",
          gap: "0.6rem",
          zIndex: 2,
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Tulis pesan..."
          style={{
            flex: 1,
            resize: "none",
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: "10px",
            padding: "0.8rem 1rem",
            fontSize: "1rem",
            outline: "none",
            minHeight: "50px",
          }}
        ></textarea>
        <button
          onClick={handleSend}
          style={{
            padding: "0 1.5rem",
            backgroundColor: "#181818",
            border: "1px solid #333",
            borderRadius: "10px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {loading ? "..." : "Kirim"}
        </button>
      </div>
    </main>
  );
}

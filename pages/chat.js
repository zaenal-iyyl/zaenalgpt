import { useState, useEffect, useRef } from "react";
import { useTheme } from "./_app";

export default function ChatPage() {
  const { dark, toggleTheme } = useTheme();
  const [messages, setMessages] = useState([
    { from: "ai", text: "Halo! Ada yang bisa saya bantu hari ini?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: data.response || "Maaf, terjadi kesalahan." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Gagal menghubungi server." },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: dark ? "#0a0a0a" : "#fafafa",
        color: dark ? "#f5f5f5" : "#111",
        fontFamily: "Inter, sans-serif",
        transition: "0.3s",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          borderBottom: `1px solid ${dark ? "#222" : "#ddd"}`,
          position: "sticky",
          top: 0,
          backgroundColor: dark ? "#0a0a0a" : "#fafafa",
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>ZaenalGPT</h1>
        <button
          onClick={toggleTheme}
          style={{
            border: "1px solid",
            borderColor: dark ? "#444" : "#ccc",
            background: "none",
            padding: "6px 12px",
            borderRadius: "8px",
            cursor: "pointer",
            color: dark ? "#f5f5f5" : "#111",
          }}
        >
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      <main
        style={{
          flex: 1,
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.from === "user"
                  ? dark
                    ? "#1e1e1e"
                    : "#e5e5e5"
                  : dark
                  ? "#161616"
                  : "#f4f4f4",
              color: dark ? "#f5f5f5" : "#111",
              borderRadius: "10px",
              padding: "0.9rem 1.1rem",
              maxWidth: "80%",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {typeof msg.text === "string" && msg.text.includes("```") ? (
              <pre
                style={{
                  background: dark ? "#111" : "#f1f1f1",
                  color: dark ? "#0f0" : "#111",
                  padding: "0.8rem",
                  borderRadius: "8px",
                  overflowX: "auto",
                  fontSize: "0.9rem",
                }}
              >
                <code>{msg.text.replace(/```[a-z]*|```/g, "")}</code>
              </pre>
            ) : (
              msg.text
            )}
            {msg.from === "ai" && msg.text && (
              <button
                onClick={() => navigator.clipboard.writeText(msg.text)}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "0.8rem",
                  marginTop: "0.4rem",
                  color: dark ? "#aaa" : "#555",
                  cursor: "pointer",
                }}
              >
                copy
              </button>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      <footer
        style={{
          display: "flex",
          padding: "1rem",
          borderTop: `1px solid ${dark ? "#222" : "#ddd"}`,
          backgroundColor: dark ? "#0a0a0a" : "#fafafa",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ketik pesan..."
          style={{
            flex: 1,
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            border: `1px solid ${dark ? "#333" : "#ccc"}`,
            background: dark ? "#1a1a1a" : "#fff",
            color: dark ? "#f5f5f5" : "#111",
            outline: "none",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: "0.8rem",
            padding: "0.8rem 1.4rem",
            border: "none",
            borderRadius: "8px",
            backgroundColor: dark ? "#f5f5f5" : "#111",
            color: dark ? "#111" : "#fff",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
          }}
        >
          Kirim
        </button>
      </footer>
    </div>
  );
}

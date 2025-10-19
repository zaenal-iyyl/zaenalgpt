import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { prompt: input });
      const aiMsg = { from: "ai", text: res.data.response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Terjadi kesalahan. Coba lagi nanti." },
      ]);
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

      

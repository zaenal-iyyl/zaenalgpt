import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("chatgpt");

  const models = [
    { id: "chatgpt41mini", name: "GPT-4.1 Mini" },
    { id: "chatgpt", name: "GPT-4.1" },
    { id: "chatgpto1p", name: "GPT-O1" },
    { id: "claude", name: "Claude 4 Sonnet" },
    { id: "gemini", name: "Gemini 2.0" },
    { id: "mistral", name: "Mistral Large 2" },
    { id: "grok", name: "Grok 3" },
  ];

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, model }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.result }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Gagal memuat respons dari server." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <header>
        <h1>ZaenalGPT</h1>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </header>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="bubble bot">...</div>}
      </div>

      <form onSubmit={sendMessage} className="input-box">
        <input
          type="text"
          placeholder="Tulis pesan kamu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </form>

      <footer>Made by Zaenal</footer>

      <style jsx>{`
        .container {
          background: #0e0e0e;
          color: #f2f2f2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: "Inter", sans-serif;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 700px;
          margin-bottom: 10px;
        }
        h1 {
          font-size: 1.5rem;
          font-weight: 600;
        }
        select {
          background: #1c1c1c;
          color: white;
          border: 1px solid #333;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
        }
        .chat-box {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 20px;
          width: 100%;
          max-width: 700px;
          height: 480px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
        }
        .bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 16px;
          margin: 6px 0;
          word-wrap: break-word;
          line-height: 1.5;
        }
        .bubble.user {
          background: #0070f3;
          color: white;
          align-self: flex-end;
        }
        .bubble.bot {
          background: #2b2b2b;
          color: #fff;
          align-self: flex-start;
        }
        .input-box {
          display: flex;
          width: 100%;
          max-width: 700px;
          margin-top: 15px;
        }
        input {
          flex: 1;
          background: #1c1c1c;
          color: white;
          border: 1px solid #333;
          border-radius: 10px 0 0 10px;
          padding: 12px;
          outline: none;
        }
        button {
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 0 10px 10px 0;
          padding: 12px 20px;
          cursor: pointer;
          font-weight: 500;
        }
        footer {
          margin-top: 20px;
          font-size: 14px;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}

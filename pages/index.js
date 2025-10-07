import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { from: "user", text: input };
    setMessages([...messages, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.result }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Terjadi kesalahan server." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">ZaenalGPT</h1>
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
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Kirim</button>
      </form>

      <p className="footer">Made by Zaenal</p>

      <style jsx>{`
        .container {
          background: #0d0d0d;
          color: #f2f2f2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .title {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .chat-box {
          background: #1a1a1a;
          border-radius: 10px;
          padding: 15px;
          width: 100%;
          max-width: 500px;
          height: 400px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .bubble {
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 12px;
          margin: 8px 0;
          word-wrap: break-word;
        }
        .bubble.user {
          background: #0070f3;
          color: #fff;
          align-self: flex-end;
        }
        .bubble.bot {
          background: #333;
          color: #fff;
          align-self: flex-start;
        }
        .input-box {
          display: flex;
          margin-top: 15px;
          width: 100%;
          max-width: 500px;
        }
        input {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px 0 0 8px;
          outline: none;
          background: #222;
          color: #fff;
        }
        button {
          background: #0070f3;
          color: #fff;
          border: none;
          border-radius: 0 8px 8px 0;
          padding: 10px 20px;
          cursor: pointer;
        }
        .footer {
          margin-top: 20px;
          font-size: 14px;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}

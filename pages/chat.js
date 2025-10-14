import { useState } from "react"
import axios from "axios"

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { from: "user", text: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")

    try {
      const res = await axios.post("/api/chat", { prompt: input })
      const aiMsg = { from: "ai", text: res.data.response }
      setMessages(prev => [...prev, aiMsg])
    } catch (err) {
      setMessages(prev => [...prev, { from: "ai", text: "Terjadi kesalahan. Coba lagi nanti." }])
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 10% 10%, #111 0%, #000 100%)",
      color: "#f1f1f1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      fontFamily: "Inter, sans-serif",
      position: "relative"
    }}>
      {/* Mesh background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        zIndex: 0
      }}></div>

      <div style={{ zIndex: 1, width: "100%", maxWidth: "700px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "1rem", textAlign: "center" }}>
          ZaenalGPT
        </h1>
        <div style={{
          height: "70vh",
          backgroundColor: "#111",
          borderRadius: "10px",
          border: "1px solid #222",
          padding: "1rem",
          overflowY: "auto",
          marginBottom: "1rem"
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              margin: "0.5rem 0",
              display: "flex",
              justifyContent: msg.from === "user" ? "flex-end" : "flex-start"
            }}>
              <div style={{
                backgroundColor: msg.from === "user" ? "#1a1a1a" : "#222",
                color: "#f1f1f1",
                padding: "0.8rem 1rem",
                borderRadius: "8px",
                maxWidth: "75%",
                lineHeight: "1.5"
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: "flex",
          gap: "0.5rem"
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Tulis pesan..."
            style={{
              flex: 1,
              padding: "0.8rem",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#111",
              color: "#fff",
              outline: "none"
            }}
          />
          <button onClick={handleSend} style={{
            padding: "0.8rem 1.6rem",
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "500"
          }}>Kirim</button>
        </div>
      </div>
    </main>
  )
}

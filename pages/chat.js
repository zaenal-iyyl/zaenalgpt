import { useState } from "react"
import axios from "axios"

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    if (loading) return

    const userText = input
    setInput("")
    setLoading(true)

    setMessages(prev => [
      ...prev,
      { from: "user", text: userText }
    ])

    try {
      const res = await axios.post("/api/chat", {
        prompt: userText
      })

      setMessages(prev => [
        ...prev,
        { from: "ai", text: res.data.response }
      ])
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { from: "ai", text: "Terjadi kesalahan, coba lagi." }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#0a0a0a",
      color: "#fff"
    }}>
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: m.from === "user" ? "flex-end" : "flex-start",
            marginBottom: "0.5rem"
          }}>
            <div style={{
              background: m.from === "user" ? "#1a1a1a" : "#222",
              padding: "0.75rem 1rem",
              borderRadius: "10px",
              maxWidth: "75%"
            }}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ opacity: 0.6 }}>
            ZaenalGPT sedang mengetik…
          </div>
        )}
      </div>

      <div style={{
        display: "flex",
        gap: "0.5rem",
        padding: "1rem",
        borderTop: "1px solid #222"
      }}>
        <input
          value={input}
          disabled={loading}
          onChange={e => setInput(e.target.value)}
          placeholder={loading ? "Menunggu jawaban..." : "Tulis pesan"}
          style={{
            flex: 1,
            padding: "0.75rem",
            background: "#111",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#fff"
          }}
          onKeyDown={e => {
            if (e.key === "Enter") handleSend()
          }}
        />

        <button
          disabled={loading}
          onClick={handleSend}
          style={{
            padding: "0 1.5rem",
            background: loading ? "#333" : "#fff",
            color: loading ? "#777" : "#000",
            borderRadius: "8px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          Kirim
        </button>
      </div>
    </main>
  )
}

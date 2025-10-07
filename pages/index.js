import { useState } from "react"
import "../styles.css"

export default function Home() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMsg = { from: "user", text: input }
    setMessages([...messages, newMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      setMessages(m => [...m, { from: "bot", text: data.reply || "Error" }])
    } catch {
      setMessages(m => [...m, { from: "bot", text: "Gagal nyambung ke server." }])
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h1 className="title">ZaenalGPT</h1>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={\`bubble \${msg.from}\`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="bubble bot">...</div>}
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan..."
        />
        <button onClick={sendMessage}>Kirim</button>
      </div>
      <footer>Made by Zaenal</footer>
    </div>
  )
}
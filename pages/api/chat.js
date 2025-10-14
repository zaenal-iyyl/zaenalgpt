
import axios from "axios"

export default async function handler(req, res) {
  const { prompt } = req.body

  try {
    const messages = [
      {
        role: "system",
        content:
          "Kamu adalah ZaenalGPT, asisten AI pintar dan tenang. Kamu berbicara dengan bahasa Indonesia yang sopan dan jelas, dengan gaya profesional, ringkas, dan natural.",
      },
      { role: "user", content: prompt },
    ]

    const params = {
      query: JSON.stringify(messages),
      link: "writecream.com",
    }

    const url =
      "https://8pe3nv3qha.execute-api.us-east-1.amazonaws.com/default/llm_chat?" +
      new URLSearchParams(params)

    const response = await axios.get(url, { headers: { accept: "*/*" } })
    res.status(200).json({ response: response.data || "Tidak ada respon dari AI." })
  } catch (e) {
    res.status(500).json({ error: e.message || "Terjadi kesalahan pada server." })
  }
}

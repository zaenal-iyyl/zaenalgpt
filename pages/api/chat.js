import axios from "axios"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { message } = req.body
  if (!message) return res.status(400).json({ error: "Message required" })

  const randomId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  const systemMessage = "Kamu adalah asisten pintar nan santai bernama ZaenalGPT, kamu bisa ngobrol dengan gaya santai tapi tetap cerdas, pakai bahasa Indonesia yang asik dan sopan."
  const prompt = `${systemMessage}\n\n${message}`

  const body = {
    id: randomId(),
    messages: [
      {
        role: "user",
        content: prompt,
        parts: [{ type: "text", text: prompt }]
      }
    ],
    selectedModel: "deepseek-ai/DeepSeek-R1"
  }

  try {
    const response = await axios.post(
      "https://ai-sdk-starter-deepinfra.vercel.app/api/chat",
      body,
      {
        headers: {
          "accept": "*/*",
          "content-type": "application/json"
        },
        responseType: "text"
      }
    )

    const data = response.data
    let final = ""

    if (data.includes('0:"')) {
      const messages = data
        .split('\n')
        .filter(line => line.startsWith('0:'))
        .map(line => {
          const match = line.match(/0:"(.*)"/)
          return match ? match[1] : ''
        })
      final = messages.join('').replace(/\\n/g, '\n').replace(/\\"/g, '"').trim()
    } else {
      final = typeof data === "string"
        ? data.replace(/\\n/g, '\n').replace(/\\"/g, '"').trim()
        : JSON.stringify(data)
    }

    return res.status(200).json({ reply: final })
  } catch (err) {
    const e = err?.response?.data || err?.message
    return res.status(500).json({ error: e })
  }
}
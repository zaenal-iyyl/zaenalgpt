import axios from "axios"
import FormData from "form-data"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { prompt } = req.body

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt tidak boleh kosong" })
  }

  try {
    const form = new FormData()
    form.append("action", "generate_chat")
    form.append(
      "query",
      JSON.stringify([
        { role: "system", content: "Kamu adalah ZaenalGPT, AI asisten cerdas." },
        { role: "user", content: prompt }
      ])
    )
    form.append("link", "writecream.com")

    const r = await axios.post(
      "https://www.writecream.com/wp-admin/admin-ajax.php",
      form,
      { headers: form.getHeaders() }
    )

    const out = r?.data?.data?.response_content

    if (!out) {
      return res.status(500).json({ error: "AI tidak memberi respon" })
    }

    res.status(200).json({ response: out.trim() })
  } catch (e) {
    res.status(500).json({ error: "Gagal menghubungi AI" })
  }
}

import axios from "axios";
import FormData from "form-data";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Prompt tidak boleh kosong" });
  }

  try {
    const form = new FormData();
    form.append("action", "generate_chat");
    form.append(
      "query",
      JSON.stringify([
        {
          role: "system",
          content: "You are ZaenalGPT, a helpful and informative AI assistant."
        },
        {
          role: "user",
          content: message
        }
      ])
    );
    form.append("link", "writecream.com");

    const response = await axios.post(
      "https://www.writecream.com/wp-admin/admin-ajax.php",
      form,
      {
        headers: {
          ...form.getHeaders()
        },
        timeout: 60000
      }
    );

    const output = response?.data?.data?.response_content;

    if (!output) {
      return res.status(500).json({ error: "Gagal mengambil respon AI" });
    }

    res.status(200).json({
      response: output.trim()
    });
  } catch (err) {
    res.status(500).json({
      error: "Terjadi kesalahan server"
    });
  }
}

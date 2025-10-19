import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { prompt } = req.body;
    if (!prompt)
      return res.status(400).json({ error: "Prompt tidak boleh kosong" });

    const messages = [
      {
        role: "system",
        content:
          "Kamu adalah ZaenalGPT, AI asisten cerdas yang pintar, elegan, dan profesional. Gunakan bahasa Indonesia yang alami, sopan tapi santai. Jangan terlalu kaku, dan bantu user dengan cepat dan jelas.",
      },
      { role: "user", content: prompt },
    ];

    const params = {
      query: JSON.stringify(messages),
      link: "writecream.com",
    };

    const url =
      "https://8pe3nv3qha.execute-api.us-east-1.amazonaws.com/default/llm_chat?" +
      new URLSearchParams(params);

    const headers = { accept: "*/*" };

    const response = await axios.get(url, { headers });

    let finalText = "";
    if (typeof response.data === "string") {
      finalText = response.data;
    } else if (response.data?.response_content) {
      finalText = response.data.response_content;
    } else if (response.data?.message) {
      finalText = response.data.message;
    } else {
      finalText = JSON.stringify(response.data);
    }

    return res.status(200).json({
      status: true,
      model: "ZaenalGPT",
      response: finalText.trim(),
    });
  } catch (error) {
    const errText =
      error.response?.data?.message || error.message || "Gagal memproses permintaan.";
    return res.status(500).json({
      status: false,
      response: "error: " + errText,
    });
  }
}

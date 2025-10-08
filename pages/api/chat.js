export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { prompt, model } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt kosong" });

  try {
    const axios = (await import("axios")).default;

    const headers = {
      accept: "application/json, text/javascript, */*; q=0.01",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
    };

    const sessionId = Date.now().toString().slice(0, 10);
    const systemMessage =
      "Kamu adalah asisten pintar nan fleksibel bernama ZaenalGPT. Gunakan gaya santai dan ramah.";
    const message = `${systemMessage}\n\n${prompt}`;

    await axios.post(
      "https://app.claila.com/api/v2/unichat1",
      `message=${encodeURIComponent(message)}&sessionId=${sessionId}`,
      { headers }
    );

    const csrfRes = await axios.get(
      "https://app.claila.com/api/v2/getcsrftoken",
      { headers: { accept: "*/*", "x-requested-with": "XMLHttpRequest" } }
    );

    const csrfToken = typeof csrfRes.data === "string" ? csrfRes.data : "";
    const finalHeaders = { ...headers, "x-csrf-token": csrfToken };
    const body = `calltype=completion&message=${encodeURIComponent(
      message
    )}&sessionId=${sessionId}`;

    const finalRes = await axios.post(
      `https://app.claila.com/api/v2/unichat1/${model}`,
      body,
      { headers: finalHeaders }
    );

    const result =
      typeof finalRes.data === "string"
        ? finalRes.data
        : JSON.stringify(finalRes.data, null, 2);

    res.status(200).json({ result });
  } catch (err) {
    const error =
      err.response?.data || err.message || "Gagal menghubungi Claila API";
    res.status(500).json({ error });
  }
}

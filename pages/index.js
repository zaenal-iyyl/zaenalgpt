import Link from "next/link"

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 20% 20%, #111 0%, #000 100%)",
      color: "#f1f1f1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      textAlign: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background mesh */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        zIndex: 0
      }}></div>

      <div style={{ zIndex: 1 }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "700", marginBottom: "1rem" }}>
          ZaenalGPT
        </h1>
        <p style={{ maxWidth: "600px", lineHeight: "1.7", fontSize: "1rem", opacity: 0.9 }}>
          ZaenalGPT adalah asisten AI modern yang dikembangkan menggunakan sistem scraping cerdas. 
          Dirancang untuk menjawab pertanyaan secara cepat, alami, dan tanpa biaya tambahan. 
          Cocok untuk obrolan santai, eksplorasi ide, hingga membantu produktivitas harian.
        </p>

        <section style={{ marginTop: "2rem", textAlign: "left", maxWidth: "600px", marginInline: "auto" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "0.8rem" }}>Fitur Unggulan</h2>
          <ul style={{ lineHeight: "1.8", opacity: 0.9 }}>
            <li>Tanpa API key & tanpa database</li>
            <li>Gratis 100% dan siap digunakan</li>
            <li>Respon cepat dan ringan</li>
            <li>Desain minimalis profesional</li>
            <li>Dapat di-deploy langsung di Vercel</li>
          </ul>
        </section>

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/chat">
            <button style={{
              padding: "0.8rem 1.6rem",
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s"
            }}>Buka Chat</button>
          </Link>

          <a href="https://github.com/zaenal-iyyl/zaenalgpt" target="_blank" rel="noopener noreferrer">
            <button style={{
              padding: "0.8rem 1.6rem",
              backgroundColor: "#111",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#ccc",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s"
            }}>Source Code</button>
          </a>
        </div>
      </div>
    </main>
  )
}

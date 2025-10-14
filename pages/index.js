import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      backgroundColor: "#000",
      color: "#f5f5f5",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid halus */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.02) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.02) 75%, rgba(255,255,255,0.02) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.02) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.02) 75%, rgba(255,255,255,0.02) 76%, transparent 77%)",
        backgroundSize: "50px 50px",
        zIndex: 0,
      }}></div>

      <div style={{ textAlign: "center", zIndex: 1, padding: "0 1rem" }}>
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
          color: "#fff"
        }}>
          ZaenalGPT
        </h1>

        <p style={{
          maxWidth: "600px",
          margin: "0 auto",
          color: "#aaa",
          fontSize: "1.1rem",
          lineHeight: "1.6"
        }}>
          ZaenalGPT adalah AI cerdas yang siap menjawab pertanyaan, membantu menulis, dan berbicara layaknya manusia.
          Dibuat tanpa API key, 100% gratis, dan langsung bisa digunakan.
        </p>

        <div style={{ marginTop: "3rem" }}>
          <Link href="/chat">
            <button style={{
              backgroundColor: "#111",
              border: "1px solid #333",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: "10px",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}
              onMouseOver={e => e.target.style.backgroundColor = "#1a1a1a"}
              onMouseOut={e => e.target.style.backgroundColor = "#111"}
            >
              Open Chat
            </button>
          </Link>
        </div>

        <div style={{ marginTop: "4rem", color: "#888", fontSize: "0.9rem" }}>
          <p><b>Fitur Unggulan:</b></p>
          <p>Tanpa API Key • Gratis 100% • Fast • Siap Pakai • Aman & Responsif</p>
        </div>

        <div style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
          <a
            href="https://github.com/zaenal-iyyl/zaenalgpt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#777", textDecoration: "underline" }}
          >
            Lihat Source Code di GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

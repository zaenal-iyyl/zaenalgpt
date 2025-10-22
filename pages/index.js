import Link from "next/link";
import { useTheme } from "./_app";

export default function Home() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div style={{
      backgroundColor: dark ? "#0a0a0a" : "#f5f5f5",
      color: dark ? "#f5f5f5" : "#111",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      overflow: "hidden",
      transition: "0.3s"
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          dark
            ? "linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.03) 25%), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.03) 25%)"
            : "linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.05) 25%), linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.05) 25%)",
        backgroundSize: "50px 50px",
        zIndex: 0,
      }}></div>

      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "none",
          border: "1px solid #444",
          borderRadius: "8px",
          color: dark ? "#fff" : "#111",
          padding: "6px 12px",
          cursor: "pointer"
        }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div style={{ textAlign: "center", zIndex: 1, padding: "0 1rem" }}>
        <h1 style={{
          fontSize: "4rem",
          fontWeight: "700",
          marginBottom: "1rem",
        }}>
          ZaenalGPT
        </h1>

        <p style={{
          maxWidth: "600px",
          margin: "0 auto",
          color: dark ? "#aaa" : "#444",
          fontSize: "1.1rem",
          lineHeight: "1.6"
        }}>
          ZaenalGPT adalah AI cerdas yang menjawab pertanyaan dan membantu menulis layaknya manusia.
          Gratis 100%, tanpa API key, dan siap digunakan.
        </p>

        <div style={{ marginTop: "3rem" }}>
          <Link href="/chat">
            <button style={{
              backgroundColor: dark ? "#111" : "#e3e3e3",
              border: "1px solid #333",
              color: dark ? "#fff" : "#111",
              padding: "14px 36px",
              borderRadius: "10px",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}>
              Open Chat
            </button>
          </Link>
        </div>

        <div style={{ marginTop: "4rem", color: dark ? "#888" : "#444", fontSize: "0.9rem" }}>
          <b>Fitur Unggulan:</b>
          <p>Tanpa API Key • Gratis 100% • Fast • Siap Pakai • Aman & Responsif</p>
        </div>

        <div style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
          <a
            href="https://github.com/zaenal-iyyl/zaenalgpt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: dark ? "#777" : "#222", textDecoration: "underline" }}
          >
            Lihat Source Code di GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

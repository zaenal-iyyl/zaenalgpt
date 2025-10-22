import Link from "next/link";
import { useTheme } from "./_app";

export default function Home() {
  const { dark, toggleTheme } = useTheme();
  return (
    <div style={{
      backgroundColor: dark ? "#000" : "#fff",
      color: dark ? "#f5f5f5" : "#111",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      overflow: "hidden",
      padding: "2rem"
    }}>
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "8px 14px",
          borderRadius: "8px",
          border: "1px solid #333",
          background: dark ? "#111" : "#f0f0f0",
          color: dark ? "#fff" : "#111",
          cursor: "pointer"
        }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 style={{
        fontSize: "3.8rem",
        fontWeight: "700",
        marginBottom: "1.2rem",
        color: dark ? "#fff" : "#111",
        textAlign: "center",
      }}>ZaenalGPT</h1>

      <p style={{
        maxWidth: "680px",
        margin: "0 auto",
        textAlign: "center",
        fontSize: "1.15rem",
        lineHeight: "1.7",
        color: dark ? "#b5b5b5" : "#333"
      }}>
        ZaenalGPT adalah asisten AI cerdas yang dirancang untuk membantu Anda menulis,
        menjawab pertanyaan, menghasilkan ide kreatif, dan memberikan inspirasi dalam waktu singkat.
        Ditenagai dengan teknologi modern, ZaenalGPT siap digunakan tanpa perlu API key — gratis dan cepat.
      </p>

      <div style={{ marginTop: "3rem" }}>
        <Link href="/chat">
          <button style={{
            backgroundColor: dark ? "#111" : "#f2f2f2",
            border: "1px solid #333",
            color: dark ? "#fff" : "#111",
            padding: "14px 40px",
            borderRadius: "10px",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "0.3s",
            fontWeight: "500"
          }}>
            Open Chat
          </button>
        </Link>
      </div>

      <div style={{ marginTop: "5rem", textAlign: "center", maxWidth: "600px" }}>
        <p style={{
          fontWeight: "600",
          marginBottom: "1rem",
          color: dark ? "#ddd" : "#222",
          fontSize: "1.2rem"
        }}>Fitur Unggulan:</p>

        <ul style={{
          listStyle: "none",
          padding: 0,
          fontSize: "1rem",
          color: dark ? "#aaa" : "#555",
          lineHeight: "1.8"
        }}>
          <li>• Tidak memerlukan API Key, langsung siap pakai.</li>
          <li>• 100% Gratis tanpa batas percakapan.</li>
          <li>• Performa cepat dan stabil untuk berbagai permintaan.</li>
          <li>• Antarmuka elegan dengan tema gelap dan terang.</li>
          <li>• Aman dan responsif di semua perangkat.</li>
        </ul>
      </div>

      <div style={{ marginTop: "3rem", fontSize: "0.95rem" }}>
        <a
          href="https://github.com/zaenal-iyyl/zaenalgpt"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: dark ? "#888" : "#444",
            textDecoration: "underline"
          }}
        >
          Lihat Source Code di GitHub
        </a>
      </div>
    </div>
  );
}

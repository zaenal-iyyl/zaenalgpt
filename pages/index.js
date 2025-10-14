import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => setFadeIn(true), []);

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
      transition: "opacity 1s ease-in-out",
      opacity: fadeIn ? 1 : 0
    }}>
    
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.03) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.03) 75%, rgba(255,255,255,0.03) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.03) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.03) 75%, rgba(255,255,255,0.03) 76%, transparent 77%)",
        backgroundSize: "60px 60px",
        animation: "moveMesh 40s linear infinite",
        zIndex: 0
      }} />

      <style jsx>{`
        @keyframes moveMesh {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 100px 100px, 100px 100px; }
        }
      `}</style>

      <div style={{ textAlign: "center", zIndex: 1, padding: "0 1rem" }}>
        <h1 style={{
          fontSize: "4rem",
          fontWeight: "700",
          marginBottom: "1rem",
          color: "#fff",
          letterSpacing: "-1px"
        }}>
          ZaenalGPT
        </h1>

        <p style={{
          maxWidth: "650px",
          margin: "0 auto",
          color: "#aaa",
          fontSize: "1.2rem",
          lineHeight: "1.7"
        }}>
          ZaenalGPT adalah asisten AI cerdas tanpa API key, 100% gratis, cepat, dan siap digunakan langsung.
        </p>

        <div style={{ marginTop: "3rem" }}>
          <Link href="/chat">
            <button style={{
              backgroundColor: "#111",
              border: "1px solid #333",
              color: "#fff",
              padding: "16px 42px",
              borderRadius: "12px",
              fontSize: "1.2rem",
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

        <div style={{ marginTop: "4rem", color: "#888", fontSize: "0.95rem" }}>
          <b>Fitur Unggulan:</b>
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

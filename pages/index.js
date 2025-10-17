import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        color: "#111",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 1rem",
          background:
            "radial-gradient(circle at 30% 20%, rgba(0,0,0,0.05), transparent 40%)",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "#111",
          }}
        >
          ZaenalGPT
        </h1>

        <p
          style={{
            maxWidth: "640px",
            color: "#333",
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "2rem",
          }}
        >
          ZaenalGPT adalah asisten AI cerdas yang dirancang untuk membantu kamu
          menulis, menjawab pertanyaan, dan berdiskusi secara natural —
          <strong> tanpa API key, gratis, dan siap digunakan</strong>.
        </p>

        <Link href="/chat">
          <button
            style={{
              backgroundColor: "#111",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: "8px",
              border: "none",
              fontSize: "1.1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Mulai Chat Sekarang
          </button>
        </Link>
      </section>

      {/* Fitur Section */}
      <section
        style={{
          backgroundColor: "#fff",
          padding: "5rem 1rem",
          textAlign: "center",
          boxShadow: "0 -1px 0 rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: "600",
            marginBottom: "2rem",
            color: "#111",
          }}
        >
          Fitur Unggulan ZaenalGPT
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {[
            {
              title: "Tanpa API Key",
              desc: "Kamu bisa langsung pakai tanpa ribet setup kunci API.",
            },
            {
              title: "Gratis 100%",
              desc: "Nikmati seluruh fitur tanpa biaya sepeser pun.",
            },
            {
              title: "Cepat & Stabil",
              desc: "Respons kilat dengan performa yang konsisten.",
            },
            {
              title: "Siap Pakai",
              desc: "Tidak perlu login, tinggal buka dan gunakan.",
            },
            {
              title: "Aman & Ringan",
              desc: "Dibangun tanpa database rumit, fokus ke kecepatan dan privasi.",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#f4f4f4",
                borderRadius: "10px",
                padding: "1.5rem",
                border: "1px solid #e5e5e5",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "#111" }}>
                {f.title}
              </h3>
              <p
                style={{
                  color: "#555",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginTop: "0.5rem",
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#f0f0f0",
          padding: "2rem 1rem",
          textAlign: "center",
          color: "#444",
          fontSize: "0.95rem",
          borderTop: "1px solid #e5e5e5",
        }}
      >
        <p>© {new Date().getFullYear()} ZaenalGPT — Dibuat oleh Zaenal </p>
        <a
          href="https://github.com/zaenal-iyyl/zaenalgpt"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "0.5rem",
            color: "#111",
            textDecoration: "underline",
          }}
        >
          Source Code di GitHub
        </a>
      </footer>
    </div>
  );
}

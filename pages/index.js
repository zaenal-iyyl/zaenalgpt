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
            maxWidth: "680px",
            color: "#333",
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "2rem",
          }}
        >
          ZaenalGPT adalah asisten AI cerdas yang dirancang untuk membantu kamu
          menulis, menjawab pertanyaan, memberikan ide, dan berdiskusi secara
          natural. <strong>Gratis 100%, tanpa API key, dan siap digunakan.</strong>
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
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Mulai Chat Sekarang
          </button>
        </Link>
      </section>

      <section
        style={{
          backgroundColor: "#fff",
          padding: "6rem 1rem",
          textAlign: "center",
          borderTop: "1px solid #eee",
        }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: "600",
            marginBottom: "2.5rem",
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
              desc: "Gunakan langsung tanpa ribet setup kunci API.",
            },
            {
              title: "Gratis 100%",
              desc: "Nikmati seluruh fitur tanpa biaya langganan.",
            },
            {
              title: "Cepat & Stabil",
              desc: "Respon cepat dengan performa server ringan dan efisien.",
            },
            {
              title: "Siap Pakai",
              desc: "Tidak perlu login atau konfigurasi tambahan.",
            },
            {
              title: "Aman & Ringan",
              desc: "Dibangun tanpa database rumit, menjaga privasi dan efisiensi.",
            },
            {
              title: "Desain Modern",
              desc: "UI bersih, profesional, dan nyaman di mata.",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#f6f6f6",
                borderRadius: "10px",
                padding: "1.7rem",
                border: "1px solid #e3e3e3",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0,0,0,0.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  color: "#111",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "#555",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginTop: "0.6rem",
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          backgroundColor: "#f9f9f9",
          padding: "2rem 1rem",
          textAlign: "center",
          color: "#555",
          fontSize: "0.95rem",
          borderTop: "1px solid #e5e5e5",
        }}
      >
        <p>© {new Date().getFullYear()} ZaenalGPT — Dibuat oleh Zaenal Dev</p>
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

import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "./_app";

export default function Home() {
  const { toggle } = useContext(ThemeContext);

  return (
    <main className="landing">
      <header className="nav">
        <span>ZaenalGPT</span>
        <button onClick={toggle}>Theme</button>
      </header>

      <section className="hero">
        <h1>ZaenalGPT</h1>
        <p>
          Asisten AI ringan untuk diskusi, menulis, dan eksplorasi ide.
          Gratis 100%, tanpa API key, cepat, dan siap pakai langsung.
        </p>
        <Link href="/chat">
          <button className="cta">Mulai Chat</button>
        </Link>
      </section>

      <section className="features">
        {[
          ["Tanpa API Key", "Langsung pakai tanpa konfigurasi apa pun."],
          ["Gratis 100%", "Tidak ada batasan atau biaya tersembunyi."],
          ["Cepat & Stabil", "Respon cepat dengan server ringan."],
          ["Privasi Aman", "Tidak menyimpan percakapan pengguna."],
          ["Full Web", "Nyaman dipakai di HP maupun desktop."]
        ].map((f, i) => (
          <div key={i} className="feature">
            <h3>{f[0]}</h3>
            <p>{f[1]}</p>
          </div>
        ))}
      </section>

      <footer>
        <p>© {new Date().getFullYear()} ZaenalGPT</p>
        <a href="https://github.com/zaenal-iyyl" target="_blank">Source Code</a>
      </footer>
    </main>
  );
}

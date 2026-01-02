import { useState, createContext } from "react";
import "../styles/globals.css";

export const ThemeContext = createContext();

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("dark");
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={theme}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  );
}

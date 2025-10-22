
import { useState, createContext, useContext } from "react";
import "@/styles/globals.css";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(true);
  const toggleTheme = () => setDark(!dark);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div className={dark ? "dark" : "light"}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  );
}

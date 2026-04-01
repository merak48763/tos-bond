import { useState, useMemo, createContext, useContext } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext({});

const Provider = ({children}) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "on");
  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", darkMode ? "off" : "on");
    setDarkMode(!darkMode);
  }

  const isAprilFool = useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Taipei",
      month: "numeric",
      day: "numeric"
    }).formatToParts(new Date());
    const month = parseInt(parts.find(p => p.type === "month").value);
    const day = parseInt(parts.find(p => p.type === "day").value);

    return month === 4 && day <= 2;
  }, []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    },
    typography: {
      button: {
        textTransform: "none"
      }
    }
  }), [darkMode]);

  return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode, isAprilFool}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const useThemeConfig = () => useContext(ThemeContext);

export default Provider;
export { useThemeConfig };

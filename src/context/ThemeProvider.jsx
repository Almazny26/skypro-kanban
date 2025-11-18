import { useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./ThemeContext";

const lightTheme = {
  background: "#eaeef6",
  mainBackground: "#eaeef6",
  cardBackground: "#ffffff",
  text: "#000000",
  textSecondary: "#94a6be",
  border: "#d0cece",
  inputBorder: "#d0cece",
  primary: "#580ea2",
  primaryHover: "#33399b",
  error: "#ff0000",
};

const darkTheme = {
  background: "#151419",
  mainBackground: "#151419",
  cardBackground: "#20202C",
  text: "#ffffff",
  textSecondary: "#94A6BE",
  border: "#4E5566",
  inputBorder: "rgba(148, 166, 190, 0.4)",
  primary: "#565EEF",
  primaryHover: "#33399b",
  error: "#ff6b6b",
};

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    // Добавляю класс темы к body, чтобы CSS селекторы работали правильно
    if (isDark) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;


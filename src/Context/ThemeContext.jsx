import { createContext, useState } from "react";

export const AppSettingsContext = createContext();

export const AppSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const light = {
    text: "#6B7280",
    primary: "#2563EB",
  };

  const dark = {
    text: "#FFFFFF",
    primary: "#2563EB",
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    colors: theme === "light" ? light : dark,
    isDark: theme === "dark",
    toggleTheme,
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

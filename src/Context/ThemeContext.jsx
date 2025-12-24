import { createContext, useState, useContext } from "react";

export const AppSettingsContext = createContext();

export const AppSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const light = {
    text: "#6B7280",
    primary: "#2563EB",
    // primary: "#5B21B6",
    background: "white",
    sidebar: "white",
    border: "#E5E5E5",
    boldText: "#000000",
    cards: "white",
    header: "white",
  };

  const dark = {
    // primary: "#5B21B6",
    primary: "#2563EB",
    colorTest: "#818CF8",
    boldText: "white",
    text: "white",
    plusProgress: "#4ADE80",
    subProgress: "text-red-400 bg-red-900/30",
    inprogress: "bg-yellow-900/30 text-yellow-300",
    completed: "bg-green-900/30 text-green-300",
    planning: "bg-blue-900/30 text-blue-300",
    heading: "text-gray-100",
    background: "#121212",
    sidebar: "#1E1E1E",
    header: "#2D2D2D",
    headings: "text-gray-100",
    cards: "#2D2D2D",
    border: "#2D2D2D",
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

export const useApp = () => useContext(AppSettingsContext);

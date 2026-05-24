import { createContext, useEffect, useState, useContext } from "react";

export const AppSettingsContext = createContext();

export const AppSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("taskore-theme") || "light",
  );

  const light = {
    text: "#475569",
    primary: "#2563EB",
    primarySoft: "#EFF6FF",
    accent: "#0F766E",
    background: "#F8FAFC",
    sidebar: "#FFFFFF",
    border: "#DDE5EF",
    boldText: "#0F172A",
    cards: "#FFFFFF",
    header: "rgba(255,255,255,0.88)",
    muted: "#F1F5F9",
  };

  const dark = {
    primary: "#60A5FA",
    primarySoft: "rgba(96,165,250,0.14)",
    accent: "#2DD4BF",
    colorTest: "#60A5FA",
    boldText: "#F8FAFC",
    text: "#D8E2F0",
    plusProgress: "#4ADE80",
    subProgress: "text-red-400 bg-red-900/30",
    inprogress: "bg-yellow-900/30 text-yellow-300",
    completed: "bg-green-900/30 text-green-300",
    planning: "bg-blue-900/30 text-blue-300",
    heading: "text-gray-100",
    background: "#0B1220",
    sidebar: "#0F172A",
    header: "rgba(15,23,42,0.92)",
    headings: "text-gray-100",
    cards: "#162033",
    border: "#2B3A55",
    muted: "#101A2B",
  };

  useEffect(() => {
    localStorage.setItem("taskore-theme", theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

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

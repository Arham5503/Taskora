import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch user function
  const fetchUser = async () => {
    try {
      let res = await fetch("http://localhost:2004/api/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        // Access token expired → call refresh
        await fetch("http://localhost:2004/api/refresh", {
          method: "GET",
          credentials: "include",
        });

        // Retry /me after refresh
        res = await fetch("http://localhost:2004/api/me", {
          method: "GET",
          credentials: "include",
        });
      }

      const data = await res.json();
      setUser(data.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

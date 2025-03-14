import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
}

interface AuthContextType {
  loading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        email,
        password,
      }
    );
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    router.push("/");
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
      {
        name,
        email,
        password,
      }
    );

    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAdminGuard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role !== "admin") {
      router.push("/403");
      return;
    }
  }, [user, loading, router]);

  return {
    isLoading: loading,
    isAdmin: user?.role === "admin",
  };
};

export default useAdminGuard;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

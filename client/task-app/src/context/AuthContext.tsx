import {
  useEffect,
  useState,
  type ReactNode,
  createContext,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import {
  getToken,
  setToken as setCookieToken,
  removeToken,
} from "../services/CookieService";
import type { User } from "../types";

//The type for the authentication context
interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = getToken();
      if (storedToken) {
        try {
          const decoded: User = jwtDecode(storedToken);
          setUser(decoded);
        } catch (error) {
          console.error("Invalid token:", error);
          removeToken(); // Clear invalid token
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = (token: string) => {
    setCookieToken(token);
    try {
      const decoded: User = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error("Failed to decode token on login:", error);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

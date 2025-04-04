
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define types for our authentication system
interface User {
  id: string;
  email: string;
  name: string;
  role: "parent" | "helper" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database (in a real app, this would be in a backend)
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "parent@example.com",
    name: "Parent User",
    role: "parent"
  },
  {
    id: "2",
    email: "helper@example.com",
    name: "Helper User",
    role: "helper"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function - simulates API call
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && password === "password") {
      // In a real app, we'd validate password hash here
      setUser(foundUser);
      localStorage.setItem("auth_user", JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}`);
      setIsLoading(false);
      return true;
    } else {
      toast.error("Invalid email or password");
      setIsLoading(false);
      return false;
    }
  };

  // Register function - simulates API call
  const register = async (email: string, name: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      toast.error("Email already registered");
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: `${MOCK_USERS.length + 1}`,
      email,
      name,
      role: "parent"
    };
    
    // In a real app, this would be a database operation
    MOCK_USERS.push(newUser);
    
    // Login the new user
    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    toast.success("Account created successfully");
    setIsLoading(false);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

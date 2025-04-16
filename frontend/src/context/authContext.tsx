// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  // Add any other user properties you need
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Here you would normally make an API call to your backend
      // This is a mock implementation
      
      // Mock successful login for demonstration
      const mockUser = {
        name: email.split('@')[0], // Just using part of email as name for demo
        email: email,
      };
      
      // Store authentication data
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setIsAuthenticated(true);
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Here you would normally make an API call to your backend
      // This is a mock implementation
      
      // Create a new user
      const newUser = {
        name,
        email,
      };
      
      // Store authentication data
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setIsAuthenticated(true);
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: { name: string; email: string } | null;
//   login: (email: string, password: string) => void;
//   signup: (name: string, email: string, password: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null);

//   const login = (email: string, password: string) => {
//     // Mock login - in real app this would call your auth service
//     console.log('Login attempted with:', email, password);
//     setIsAuthenticated(true);
//     setUser({ name: 'John Doe', email });
//   };

//   const signup = (name: string, email: string, password: string) => {
//     // Mock signup - in real app this would call your auth service
//     console.log('Signup attempted with:', name, email, password);
//     setIsAuthenticated(true);
//     setUser({ name, email });
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     console.log('User logged out');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: { name: string; email: string } | null;
//   login: (email: string, password: string) => void;
//   signup: (name: string, email: string, password: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null);

//   const login = (email: string, password: string) => {
//     console.log('Login attempted with:', email, password);

//     // ✅ Bypass auth logic - mock successful login
//     setIsAuthenticated(true);
//     setUser({ name: 'John Doe', email });
//   };

//   const signup = (name: string, email: string, password: string) => {
//     console.log('Signup attempted with:', name, email, password);
//     setIsAuthenticated(true);
//     setUser({ name, email });
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     console.log('User logged out');
//   };

//   // ✅ Auto login when app loads (ONLY FOR LOCALHOST)
//   useEffect(() => {
//     const hostname = window.location.hostname;
//     if (hostname === 'localhost' || hostname === '127.0.0.1') {
//       login('testuser@example.com', 'password123');
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const API_URL = 'http://localhost:8000/api/auth';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Auto login from localStorage if present
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    setUser(data.user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token); 
  };

  // const signup = async (name: string, email: string, password: string) => {
  //   const res = await fetch(`${API_URL}/signup`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name, email, password }),
  //   });

  //   const data = await res.json();
  //   if (!res.ok) throw new Error(data.message || "Signup failed");

  //   setUser(data.user);
  //   setIsAuthenticated(true);
  //   localStorage.setItem("user", JSON.stringify(data.user));
  // };

  const signup = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");
  
    setUser(data.user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token); // ✅ this line is required
  };
  

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

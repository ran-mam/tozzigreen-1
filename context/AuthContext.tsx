// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "../services/api";
// import { clearTokens, getAccessToken, storeTokens } from "../utils/storage";

// const AuthContext = createContext({});

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const token = await getAccessToken();
//       if (token) {
//         // Validate token by fetching user info or just assume valid
//         setIsAuthenticated(true);
//         // You can add a /me endpoint to get user details
//       }
//     } catch (error) {
//       console.error("Auth check failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (username, password) => {
//     try {
//       const response = await api.post("/auth/login", { username, password });
//       const {
//         accessToken,
//         refreshToken,
//         id,
//         username: userName,
//         phone,
//       } = response.data;
//       await storeTokens(accessToken, refreshToken);
//       setUser({ id, username: userName, phone });
//       setIsAuthenticated(true);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || "Login failed",
//       };
//     }
//   };

//   const register = async (username, password, phone) => {
//     try {
//       const response = await api.post("/auth/register", {
//         username,
//         password,
//         phone,
//       });
//       const {
//         accessToken,
//         refreshToken,
//         id,
//         username: userName,
//         phone: userPhone,
//       } = response.data;
//       await storeTokens(accessToken, refreshToken);
//       setUser({ id, username: userName, phone: userPhone });
//       setIsAuthenticated(true);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || "Registration failed",
//       };
//     }
//   };

//   const logout = async () => {
//     try {
//       const refreshToken = await getRefreshToken();
//       if (refreshToken) {
//         await api.post("/auth/logout", { refreshToken });
//       }
//     } catch (error) {
//       console.error("Logout error", error);
//     } finally {
//       await clearTokens();
//       setUser(null);
//       setIsAuthenticated(false);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, register, logout, isAuthenticated, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

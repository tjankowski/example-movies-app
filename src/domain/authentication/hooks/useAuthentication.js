import { useState, createContext, useContext, useMemo } from "react";
import { saveItem, getItem, removeItem } from "infrastrucutre/storage";

const AuthenticationContext = createContext("authentication");
const TOKEN = "token";

export function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      `useAuthentication must be used within a AuthenticationContext`
    );
  }
  return context;
}

export const AuthenticationProvider = (props) => {
  const [token, setToken] = useState(getItem(TOKEN));
  const [isLoginFormOpen, toggleLoginForm] = useState(false);
  const value = useMemo(
    () => ({
      token,
      isAuthenticated: token != null,
      setToken,
      login: (token) => {
        setToken(token);
        saveItem(TOKEN, token);
      },
      logout: () => {
        setToken(null);
        removeItem(TOKEN);
      },
      isLoginFormOpen,
      toggleLoginForm,
    }),
    [token, isLoginFormOpen]
  );
  return <AuthenticationContext.Provider value={value} {...props} />;
};

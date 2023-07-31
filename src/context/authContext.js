import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase-config";

const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      else setUserInfo(user);
    });
  }, []);
  const value = { userInfo, setUserInfo };
  return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };

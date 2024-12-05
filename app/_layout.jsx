import { createContext, useState, useEffect } from "react";
import { Stack, router } from "expo-router";
export const AuthContext = createContext();
export default function Layout() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (userToken) {
      router.replace("/home/home");
    } else {
      router.replace("/login");
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ setUserToken }}>
      <Stack></Stack>
    </AuthContext.Provider>
  );
}

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log("HHEEEYYYY")
    const userData = localStorage.getItem("user");
    // console.log(userData)
    if (userData !== undefined && userData !== null) {
      const parsedUser = JSON.parse(userData);
      // console.log(parsedUser)
      setUser(parsedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

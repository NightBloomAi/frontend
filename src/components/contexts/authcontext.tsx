import React, { createContext, useState } from "react";

interface AuthContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  signInPopUpVisible: boolean;
  setSignInPopUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loginNotSignUp: boolean;
  setLoginNotSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  setLoggedIn: () => {},
  username: "",
  setUsername: () => {},
  signInPopUpVisible: false,
  setSignInPopUpVisible: () => {},
  loginNotSignUp: true,
  setLoginNotSignUp: () => {},
});

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [signInPopUpVisible, setSignInPopUpVisible] = useState(false);
  const [loginNotSignUp, setLoginNotSignUp] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        username,
        setUsername,
        signInPopUpVisible,
        setSignInPopUpVisible,
        loginNotSignUp,
        setLoginNotSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

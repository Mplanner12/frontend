"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface StateContextProps {
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  user: any;
  token: string | null;
}

const StateContext = createContext<StateContextProps>({
  setUser: () => {},
  setToken: () => {},
  user: "",
  token: null,
});

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("Access_token") : null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("Access_token") || null);
    }
  }, []);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (typeof window !== "undefined") {
      if (newToken) {
        localStorage.setItem("Access_token", newToken);
      } else {
        localStorage.removeItem("Access_token");
      }
    }
  };

  return (
    <StateContext.Provider
      value={{ user, token, setUser, setToken: updateToken }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

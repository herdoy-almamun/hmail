"use client";

import useAuthUser from "@/hooks/use-auth-user";
import axios from "axios";
import jwt from "jsonwebtoken";
import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/token");
        const decodedUser = jwt.decode(res.data) as User;
        setUserId(decodedUser.id);
      } catch (error) {
        setUserId("");
      }
    };

    fetchUser();
  }, []);

  const { data: user } = useAuthUser(userId);

  if (!user) return <> {children} </>;
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

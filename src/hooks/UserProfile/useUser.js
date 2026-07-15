import { useState, useEffect } from "react";

export default function useUser() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");

    return savedUser
      ? JSON.parse(savedUser)
      : {
          username: "",
          name: "",
          email: "",
          nohp: "",
          password: "",
          jenisKelamin: "",
          tanggalLahir: "",
          fotoProfil: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return { user, setUser };
}
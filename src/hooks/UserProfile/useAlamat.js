import { useState, useEffect } from "react";

export default function useAlamat() {
  const [alamat, setAlamat] = useState(() => {
    const savedAlamat = localStorage.getItem("alamatData");
    if (!savedAlamat) return [];

    const parsedData = JSON.parse(savedAlamat);

    
    return parsedData.map((item) => ({
      ...item,
      id: item.id || Date.now() + Math.random(),
    }));
  });

  useEffect(() => {
    localStorage.setItem("alamatData", JSON.stringify(alamat));
  }, [alamat]);

  return { alamat, setAlamat };
}
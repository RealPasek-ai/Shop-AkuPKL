import { useState, useEffect } from 'react';

export const useBank = () => {
  const [kartu, setKartu] = useState(() => {
    const savedCards = localStorage.getItem('user_cards');
    return savedCards ? JSON.parse(savedCards) : [];
  });

  useEffect(() => {
    localStorage.setItem('user_cards', JSON.stringify(kartu));
  }, [kartu]);

  return { kartu, setKartu };
};
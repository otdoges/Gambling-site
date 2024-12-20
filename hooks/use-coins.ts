"use client";

import { useState, useEffect } from 'react';
import { getStoredCoins, updateStoredCoins } from '@/lib/storage';

export function useCoins() {
  const [coins, setCoins] = useState(10000);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCoins();
  }, []);

  const loadCoins = () => {
    try {
      const userCoins = getStoredCoins();
      setCoins(userCoins);
    } catch (error) {
      console.error('Error loading coins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCoins = (amount: number) => {
    try {
      const newAmount = updateStoredCoins(amount);
      setCoins(newAmount);
    } catch (error) {
      console.error('Error updating coins:', error);
    }
  };

  return { coins, isLoading, updateCoins };
}
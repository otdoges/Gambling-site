"use client";

const STORAGE_KEY = 'fakebet_coins';
const DEFAULT_COINS = 10000;
const MIN_COINS = 1000;

export function getStoredCoins(): number {
  if (typeof window === 'undefined') return DEFAULT_COINS;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, DEFAULT_COINS.toString());
    return DEFAULT_COINS;
  }
  
  return parseInt(stored, 10);
}

export function updateStoredCoins(amount: number): number {
  if (typeof window === 'undefined') return DEFAULT_COINS;
  
  const currentCoins = getStoredCoins();
  const newAmount = Math.max(currentCoins + amount, MIN_COINS);
  localStorage.setItem(STORAGE_KEY, newAmount.toString());
  
  return newAmount;
}
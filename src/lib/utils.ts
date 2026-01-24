import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPhoneUSA(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return `+1 ${numbers}`;
  if (numbers.length <= 6) return `+1 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  return `+1 ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
}

export function formatPhoneMX(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return `+52 ${numbers}`;
  if (numbers.length <= 6) return `+52 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  return `+52 ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

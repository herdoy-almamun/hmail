import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | Date): string {
  if (!input) return "loading...";
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toDateString();
}

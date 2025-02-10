import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateDescription = (
  description: string,
  maxLength: number
): string => {
  return description.length > maxLength
    ? `${description.slice(0, maxLength)}...`
    : description;
};

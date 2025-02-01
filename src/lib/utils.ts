import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toArabicNumber(num: number) {
  return num
    .toString()
    .replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1584));
}

export function fixDate(date: string) {
  return date.replace(/(\d)\/(\d)/, "0$1/0$2");
}

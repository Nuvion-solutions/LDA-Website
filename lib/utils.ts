import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BUSINESS = {
  name: "California Legal Document Excellence, LLC",
  shortName: "CLDE",
  lda: "LDA #87",
  county: "Sonoma County",
  phone: "(707) 909-1240",
  phoneTel: "+17079091240",
  email: "contact@calegaldocumenthelp.com",
  hours: "Monday–Saturday, 9:00 AM – 5:00 PM",
} as const;

export const SHORT_DISCLAIMER =
  "California Legal Document Excellence, LLC is not a law firm and does not provide legal advice or legal representation.";

export const FULL_DISCLAIMER =
  "California Legal Document Excellence, LLC is a Registered Legal Document Assistant (LDA #87, Sonoma County). We are not a law firm and do not provide legal advice, legal representation, or legal counsel. All document preparation services are provided at the client's direction. We are not attorneys.";

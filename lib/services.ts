import {
  Scale,
  Home,
  Plane,
  FileSignature,
  Stamp,
  Car,
  Folder,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  what: string;
  documents: string;
  who: string;
};

export const SERVICES: Service[] = [
  {
    id: "divorce",
    slug: "divorce-family-law",
    title: "Divorce & Family Law Documents",
    short: "Petitions, responses, custody and support forms, and settlement paperwork.",
    icon: Scale,
    what: "Document preparation for individuals handling their own family law matters in California courts.",
    documents:
      "Petition for Dissolution, Response, QDRO forms, Marital Settlement Agreement, child custody and support forms, FL series court forms.",
    who: "For individuals seeking to prepare their own family law paperwork.",
  },
  {
    id: "eviction",
    slug: "eviction-paperwork",
    title: "Eviction (Unlawful Detainer) Paperwork",
    short: "3-Day Notices, UD-100, UD-105, and related unlawful detainer forms.",
    icon: Home,
    what: "Document preparation for landlords who need eviction paperwork prepared accurately and on time.",
    documents:
      "3-Day Notice to Pay or Quit, UD-100 Complaint, UD-105 Summons, Proof of Service, and related Unlawful Detainer forms.",
    who: "For landlords who need eviction paperwork prepared correctly.",
  },
  {
    id: "immigration",
    slug: "immigration-documents",
    title: "Immigration Documents",
    short: "USCIS forms including I-130, I-485, N-400, I-131, and supporting paperwork.",
    icon: Plane,
    what: "Document preparation assistance for individuals completing their own USCIS filings.",
    documents:
      "USCIS forms including I-130, I-485, N-400, I-131, and related supporting documentation.",
    who: "For individuals preparing their own immigration paperwork.",
  },
  {
    id: "living-trust",
    slug: "living-trust",
    title: "Living Trust Documents",
    short: "Revocable Living Trust, Pour-Over Will, Certification of Trust, and Schedule of Assets.",
    icon: FileSignature,
    what: "Document preparation for individuals creating their own estate planning paperwork.",
    documents:
      "Revocable Living Trust, Pour-Over Will, Certification of Trust, Schedule of Assets.",
    who: "For individuals who want to prepare their estate planning documents.",
  },
  {
    id: "power-of-attorney",
    slug: "power-of-attorney",
    title: "Power of Attorney",
    short: "General, Durable, and Healthcare Directive forms prepared at your direction.",
    icon: Stamp,
    what: "Document preparation for individuals designating decision-making authority.",
    documents:
      "General Power of Attorney, Durable Power of Attorney, Healthcare Directive forms.",
    who: "For individuals who need to designate decision-making authority.",
  },
  {
    id: "dmv",
    slug: "dmv-administrative",
    title: "DMV & Administrative Forms",
    short: "DMV form completion assistance and general administrative paperwork.",
    icon: Car,
    what: "Clerical assistance with DMV and administrative paperwork — client submits all forms directly.",
    documents:
      "DMV form completion assistance, general administrative paperwork organization and preparation.",
    who: "For individuals who need help completing DMV and administrative forms accurately.",
  },
  {
    id: "tax-organization",
    slug: "tax-document-organization",
    title: "Tax Document Organization (Clerical)",
    short: "Clerical organization and preparation of tax paperwork — no tax advice.",
    icon: Folder,
    what: "Clerical document organization and preparation assistance. We do not provide tax advice. Clients submit all tax documents directly.",
    documents:
      "Document organization, clerical assembly of records, and preparation assistance for tax paperwork.",
    who: "For individuals who need organizational support for their tax documents.",
  },
];

export const HOMEPAGE_SERVICES = SERVICES.slice(0, 6);

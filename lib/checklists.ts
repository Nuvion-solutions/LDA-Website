// Personalized document checklists shown on the intake success page,
// keyed by the primaryService value selected in Step 2 of the intake form.

export type ServiceChecklist = {
  title: string;
  intro: string;
  items: string[];
  note: string;
};

export const SERVICE_CHECKLISTS: Record<string, ServiceChecklist> = {
  "Divorce & Family Law Documents": {
    title: "Documents to Gather for Your Divorce Paperwork",
    intro: "Having these ready will help us prepare your documents faster:",
    items: [
      "Marriage certificate",
      "Full legal names and dates of birth for both parties",
      "Current addresses for both parties",
      "List of all real property (addresses, estimated values)",
      "List of financial accounts (bank, retirement, investments)",
      "Vehicle information (make, model, year, estimated value)",
      "Children's full legal names and dates of birth (if applicable)",
      "Any existing court orders or agreements between the parties",
      "Approximate date of separation",
    ],
    note:
      "You do not need all of these to get started — bring what you have and we'll guide you through the rest.",
  },
  "Eviction (Unlawful Detainer) Paperwork": {
    title: "Documents to Gather for Your Eviction Paperwork",
    intro: "Please have the following available when we follow up:",
    items: [
      "Copy of the current lease or rental agreement",
      "Tenant's full legal name(s) as they appear on the lease",
      "Full address of the rental property",
      "Record of rent payments (or non-payments)",
      "Copy of any notice(s) already served to the tenant",
      "Date(s) the notice(s) were served and how they were served",
      "Any written communications with the tenant about the issue",
    ],
    note:
      "If you've already served a notice, bring a copy — the date and method of service are important for the paperwork.",
  },
  "Immigration Documents": {
    title: "Documents to Gather for Your Immigration Paperwork",
    intro:
      "The exact documents needed depend on which forms you're filing, but generally you'll need:",
    items: [
      "Valid government-issued photo ID",
      "Passport (yours and any family members involved)",
      "Birth certificates for all applicants",
      "Marriage certificate (if filing for a spouse)",
      "Any prior immigration documents (visa, green card, prior applications)",
      "USCIS receipt notices for any pending applications",
      "Proof of address (utility bill, lease, bank statement)",
      "Two passport-sized photos per applicant",
    ],
    note:
      "Immigration forms have specific photo and document requirements. We'll confirm exactly what's needed for your specific forms when we follow up.",
  },
  "Living Trust Documents": {
    title: "Documents to Gather for Your Living Trust",
    intro: "To prepare your trust documents, please gather:",
    items: [
      "Full legal names and dates of birth for all trustees and beneficiaries",
      "Addresses for all trustees and beneficiaries",
      "Deeds or titles for any real property to be included",
      "List of financial accounts you want to include (account numbers not required yet)",
      "Vehicle titles (if including vehicles)",
      "Names and contact information for your successor trustee(s)",
      "Names and ages of any minor beneficiaries",
      "Existing will or estate documents (if any)",
    ],
    note:
      "We prepare the documents at your direction. You decide what goes into your trust — we handle the paperwork.",
  },
  "Power of Attorney": {
    title: "Documents to Gather for Your Power of Attorney",
    intro: "Please have the following ready:",
    items: [
      'Full legal name and date of birth of the person granting authority (the "principal")',
      'Full legal name and contact information of the person receiving authority (the "agent")',
      "Government-issued ID for the principal",
      "Description of the specific powers or limitations you want to include (if any)",
      "Name of an alternate agent (recommended in case your first choice is unavailable)",
    ],
    note:
      "Power of Attorney documents typically require notarization. We can help prepare the document — you'll arrange notarization separately.",
  },
  "DMV Form Assistance": {
    title: "Documents to Gather for DMV Form Assistance",
    intro: "Depending on your DMV matter, you may need:",
    items: [
      "Current vehicle title or pink slip",
      "Valid government-issued photo ID",
      "Current vehicle registration",
      "Proof of insurance",
      "Bill of sale (for transfers)",
      "Release of liability (if selling a vehicle)",
      "DMV appointment confirmation (if you have one)",
    ],
    note:
      "We help you complete the forms — you submit them to the DMV directly.",
  },
  "Tax Document Organization (Clerical)": {
    title: "Documents to Gather for Tax Document Organization",
    intro: "Please gather the following:",
    items: [
      "All W-2 forms from employers",
      "1099 forms (interest, dividends, contract work, etc.)",
      "Prior year tax return (for reference)",
      "Social Security numbers for yourself and dependents",
      "Receipts or records for any deductions you're claiming",
      "Any IRS or state tax notices received",
      "Bank statements if needed for income verification",
    ],
    note:
      "We provide clerical organization and document preparation assistance only. We do not provide tax advice. You submit all tax documents directly.",
  },
  default: {
    title: "Documents to Gather",
    intro: "While we review your intake, start gathering:",
    items: [
      "Valid government-issued photo ID",
      "Any existing documents related to your matter",
      "Dates and details relevant to your situation",
      "Contact information for any other parties involved",
    ],
    note:
      "We'll follow up within 1 business day with specific requirements for your documents.",
  },
};

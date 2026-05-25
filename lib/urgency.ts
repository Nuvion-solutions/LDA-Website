// Urgency calculation shared between the intake form (for the urgency
// banner) and the API route (for GHL tagging).

import { differenceInDays } from "date-fns";

export type UrgencyTag =
  | "urgent-7-days"
  | "urgent-14-days"
  | "deadline-30-days"
  | "standard-lead";

type UrgencyInput = {
  primaryService?: string;
  immigrationHasDeadline?: string;
  immigrationDeadlineDate?: string;
  dmvHasAppointment?: string;
  dmvAppointmentDate?: string;
  taxHasDeadline?: string;
  taxDeadlineDate?: string;
  otherHasDeadline?: string;
  otherDeadlineDate?: string;
};

/**
 * Returns the relevant deadline date (ISO yyyy-mm-dd) for the selected
 * primary service, or null if the client did not indicate one.
 */
export function getDeadlineDate(data: UrgencyInput): string | null {
  switch (data.primaryService) {
    case "Immigration Documents":
      return data.immigrationHasDeadline === "Yes"
        ? data.immigrationDeadlineDate || null
        : null;
    case "DMV Form Assistance":
      return data.dmvHasAppointment === "Yes"
        ? data.dmvAppointmentDate || null
        : null;
    case "Tax Document Organization (Clerical)":
      return data.taxHasDeadline === "Yes"
        ? data.taxDeadlineDate || null
        : null;
    case "Other / Not Sure":
      return data.otherHasDeadline === "Yes"
        ? data.otherDeadlineDate || null
        : null;
    default:
      return null;
  }
}

export function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return null;
  return differenceInDays(parsed, new Date());
}

export function urgencyTagFor(days: number | null): UrgencyTag {
  if (days === null) return "standard-lead";
  if (days <= 7) return "urgent-7-days";
  if (days <= 14) return "urgent-14-days";
  if (days <= 30) return "deadline-30-days";
  return "standard-lead";
}

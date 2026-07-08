"use client";

import { useState, useRef } from "react";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { useForm, Controller } from "react-hook-form";
import type { Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CalendarClock,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { CallLink } from "@/components/analytics/CallLink";
import {
  getDeadlineDate,
  daysUntil,
} from "@/lib/urgency";
import {
  SERVICE_CHECKLISTS,
  checklistTitle,
  checklistIntro,
  checklistItems,
  checklistNote,
} from "@/lib/checklists";
import { sendGAEvent } from "@next/third-parties/google";
import { useLanguage } from "@/lib/language-context";
import {
  SERVICE_NAME_TRANSLATIONS,
  optionLabel,
  translations,
  type Language,
  type TranslationKey,
} from "@/lib/translations";

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const PRIMARY_SERVICES = [
  "Divorce & Family Law Documents",
  "Eviction (Unlawful Detainer) Paperwork",
  "Living Trust Documents",
  "Wills & Health Care Directives",
  "Probate Documents",
  "Power of Attorney",
  "Legal Name Change",
  "Small Claims Paperwork",
  "Guardianship Documents",
  "Deeds & Property Transfers",
  "DMV Form Assistance",
  "Tax Document Organization (Clerical)",
  "Other / Not Sure",
] as const;

const WILLS_FOR_OPTIONS = [
  "Myself",
  "Myself and spouse/partner",
  "Family member",
] as const;

const WILLS_DOC_OPTIONS = [
  "Last Will & Testament only",
  "Health Care Directive only",
  "Both will and directive",
  "Not sure yet",
] as const;

const PROBATE_RELATIONS = [
  "Spouse/partner",
  "Adult child",
  "Other family member",
  "Other",
] as const;

const ESTATE_VALUE_RANGES = [
  "Under $200,000",
  "$200,000 – $500,000",
  "Over $500,000",
  "Not sure",
] as const;

const NAME_CHANGE_FOR = [
  "Myself",
  "My child",
  "Myself and my child",
] as const;

const NAME_CHANGE_REASONS = [
  "Marriage or divorce related",
  "Personal preference",
  "Gender identity",
  "Other / prefer not to say",
] as const;

const SMALL_CLAIMS_ROLES = [
  "Filing a claim (plaintiff)",
  "Responding to a claim (defendant)",
  "Collecting a judgment I won",
] as const;

const SMALL_CLAIMS_AMOUNTS = [
  "Under $2,500",
  "$2,500 – $7,500",
  "$7,500 – $12,500",
  "Over $12,500",
] as const;

const GUARDIANSHIP_TYPES = [
  "Guardianship of the person (care & custody)",
  "Guardianship of the estate (finances)",
  "Both",
  "Not sure",
] as const;

const GUARDIANSHIP_RELATIONS = [
  "Grandparent",
  "Aunt/uncle",
  "Sibling",
  "Other relative",
  "Family friend",
  "Other",
] as const;

const DEED_TYPES = [
  "Quitclaim Deed",
  "Grant Deed",
  "Interspousal Transfer Deed",
  "Trust Transfer Deed",
  "Not sure",
] as const;

const DEED_REASONS = [
  "Add or remove a spouse",
  "Transfer into a living trust",
  "Divorce settlement",
  "Family gift or transfer",
  "Other",
] as const;

const COUNTIES = [
  "Sonoma",
  "Napa",
  "Marin",
  "Alameda",
  "Contra Costa",
  "San Francisco",
  "Sacramento",
  "Solano",
  "Other",
] as const;

const REFERRAL_SOURCES = [
  "Google Search",
  "Social Media",
  "Referral",
  "Nextdoor",
  "Other",
] as const;

const MARRIAGE_LENGTHS = [
  "Less than 1 year",
  "1-5 years",
  "5-10 years",
  "10-20 years",
  "20+ years",
] as const;

const EVICTION_REASONS = [
  "Non-payment of rent",
  "Lease violation",
  "End of lease",
  "Owner move-in",
  "Other",
] as const;

const NOTICE_TYPES = [
  "3-Day Notice to Pay or Quit",
  "3-Day Notice to Cure",
  "30-Day Notice",
  "60-Day Notice",
  "Other",
] as const;

const RENT_RANGES = [
  "Under $1,000",
  "$1,000-$2,000",
  "$2,000-$3,000",
  "$3,000+",
  "Prefer not to say",
] as const;

const POA_TYPES = [
  "General / Financial Power of Attorney",
  "Durable Power of Attorney",
  "Healthcare Directive / Advance Directive",
  "Limited Power of Attorney (specific purpose)",
  "Not sure — I need help understanding the options",
] as const;

const AGENT_OPTIONS = [
  "Spouse/partner",
  "Adult child",
  "Other family member",
  "Friend",
  "Professional",
  "Not sure yet",
] as const;

const DMV_FORM_OPTIONS = [
  "Vehicle title transfer",
  "Registration forms",
  "Address change",
  "License plate application",
  "Disabled placard application",
  "Other DMV paperwork",
] as const;

const TAX_TYPE_OPTIONS = [
  "Organizing/sorting tax documents",
  "Completing tax forms (clerical preparation only — client submits)",
  "Prior year document organization",
  "Other clerical tax assistance",
] as const;

const TAX_YEARS = [
  "2024",
  "2023",
  "2022",
  "Multiple years",
  "Not sure",
] as const;

const TRUST_SUCCESSOR_OPTIONS = [
  "Spouse/partner",
  "Adult child",
  "Other family member",
  "Friend",
  "Not sure yet",
] as const;

// ---------------------------------------------------------------------------
// Error message helper
// ---------------------------------------------------------------------------

// Schema messages are translation-key strings (e.g. "err_first_name"); this
// resolves them through t() at render time. Unknown strings pass through.
function tErr(
  msg: string | undefined,
  t: (k: TranslationKey) => string,
): string | undefined {
  if (!msg) return undefined;
  if (msg in (translations.en as Record<string, string>)) {
    return t(msg as TranslationKey);
  }
  return msg;
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const requiredEnum = <T extends readonly [string, ...string[]]>(
  values: T,
  msg: string,
) => z.enum(values, { message: msg });

const optStr = z.string().max(2000).optional().or(z.literal(""));
const optDate = z.string().optional().or(z.literal(""));

const intakeSchema = z
  .object({
    // Step 1
    firstName: z.string().min(1, "err_first_name").max(100),
    lastName: z.string().min(1, "err_last_name").max(100),
    phone: z
      .string()
      .min(7, "err_phone_invalid")
      .max(30, "err_phone_long")
      .regex(/^[0-9+()\-.\s]+$/, "err_phone_invalid"),
    email: z.email("err_email_invalid"),
    contactMethod: requiredEnum(
      ["Phone", "Email", "Text"],
      "err_contact_method",
    ),
    bestTime: requiredEnum(
      ["Morning", "Afternoon", "LateAfternoon"],
      "err_best_time",
    ),

    // Step 2
    primaryService: requiredEnum(PRIMARY_SERVICES, "err_choose_service"),
    needsMoreServices: requiredEnum(
      ["Yes", "No"],
      "err_yes_no",
    ),
    additionalServices: z.array(z.string()).optional(),

    // Step 3 — Divorce
    divorceType: z
      .enum(["Uncontested", "Contested", "Not sure yet"])
      .optional(),
    divorceHasChildren: z.enum(["Yes", "No"]).optional(),
    divorceChildrenCount: optStr,
    divorceChildrenAges: optStr,
    divorceHasProperty: z.enum(["Yes", "No", "Not sure"]).optional(),
    divorceHasAssets: z.enum(["Yes", "No", "Not sure"]).optional(),
    divorceMarriageLength: z.enum(MARRIAGE_LENGTHS).optional(),
    divorceFilingCounty: z.enum(COUNTIES).optional(),
    divorceFiledPaperwork: z.enum(["Yes", "No"]).optional(),

    // Step 3 — Eviction
    evictionParty: z.enum(["Landlord", "Tenant"]).optional(),
    evictionPropertyType: z.enum(["Residential", "Commercial"]).optional(),
    evictionReason: z.enum(EVICTION_REASONS).optional(),
    evictionNoticeServed: z.enum(["Yes", "No"]).optional(),
    evictionNoticeType: z.enum(NOTICE_TYPES).optional(),
    evictionNoticeDate: optDate,
    evictionCounty: z.enum(COUNTIES).optional(),
    evictionTenantVacated: z.enum(["Yes", "No", "Partially"]).optional(),
    evictionRent: z.enum(RENT_RANGES).optional(),

    // Step 3 — Living Trust
    trustType: z.enum(["Individual", "Married couple"]).optional(),
    trustHasMinors: z.enum(["Yes", "No"]).optional(),
    trustOwnsProperty: z.enum(["Yes", "No"]).optional(),
    trustPropertyCount: optStr,
    trustHasAssets: z.enum(["Yes", "No", "Not sure"]).optional(),
    trustExistingDocs: z.enum(["Yes", "No", "Not sure"]).optional(),
    trustSuccessor: z.enum(TRUST_SUCCESSOR_OPTIONS).optional(),

    // Step 3 — Power of Attorney
    poaTypes: z.array(z.string()).optional(),
    poaAgent: z.enum(AGENT_OPTIONS).optional(),
    poaHasReason: z.enum(["Yes", "No"]).optional(),
    poaReason: optStr,
    poaNotarize: z.enum(["Yes", "No", "Not sure"]).optional(),

    // Step 3 — DMV
    dmvFormTypes: z.array(z.string()).optional(),
    dmvHasAppointment: z.enum(["Yes", "No"]).optional(),
    dmvAppointmentDate: optDate,
    dmvDetails: optStr,

    // Step 3 — Tax
    taxTypes: z.array(z.string()).optional(),
    taxYear: z.enum(TAX_YEARS).optional(),
    taxHasDeadline: z.enum(["Yes", "No"]).optional(),
    taxDeadlineDate: optDate,
    taxNotes: optStr,

    // Step 3 — Wills & Health Care Directives
    willsFor: z.enum(WILLS_FOR_OPTIONS).optional(),
    willsDocuments: z.enum(WILLS_DOC_OPTIONS).optional(),
    willsOwnsProperty: z.enum(["Yes", "No"]).optional(),
    willsHasMinors: z.enum(["Yes", "No"]).optional(),
    willsExistingDocs: z.enum(["Yes", "No", "Not sure"]).optional(),

    // Step 3 — Probate
    probateRelation: z.enum(PROBATE_RELATIONS).optional(),
    probateHasWill: z.enum(["Yes", "No", "Not sure"]).optional(),
    probateHasRealEstate: z.enum(["Yes", "No", "Not sure"]).optional(),
    probateEstateValue: z.enum(ESTATE_VALUE_RANGES).optional(),
    probateCounty: z.enum(COUNTIES).optional(),
    probateHasDeadline: z.enum(["Yes", "No"]).optional(),
    probateDeadlineDate: optDate,

    // Step 3 — Name Change
    nameChangeFor: z.enum(NAME_CHANGE_FOR).optional(),
    nameChangeReason: z.enum(NAME_CHANGE_REASONS).optional(),
    nameChangeCounty: z.enum(COUNTIES).optional(),
    nameChangeHasCourtDate: z.enum(["Yes", "No"]).optional(),
    nameChangeCourtDate: optDate,

    // Step 3 — Small Claims
    smallClaimsRole: z.enum(SMALL_CLAIMS_ROLES).optional(),
    smallClaimsAmount: z.enum(SMALL_CLAIMS_AMOUNTS).optional(),
    smallClaimsCounty: z.enum(COUNTIES).optional(),
    smallClaimsHasHearing: z.enum(["Yes", "No"]).optional(),
    smallClaimsHearingDate: optDate,
    smallClaimsDescription: optStr,

    // Step 3 — Guardianship
    guardianshipType: z.enum(GUARDIANSHIP_TYPES).optional(),
    guardianshipRelation: z.enum(GUARDIANSHIP_RELATIONS).optional(),
    guardianshipCounty: z.enum(COUNTIES).optional(),
    guardianshipHasCourtDate: z.enum(["Yes", "No"]).optional(),
    guardianshipCourtDate: optDate,

    // Step 3 — Deeds & Property Transfers
    deedType: z.enum(DEED_TYPES).optional(),
    deedReason: z.enum(DEED_REASONS).optional(),
    deedCounty: z.enum(COUNTIES).optional(),
    deedPropertyCount: optStr,

    // Step 3 — Other
    otherDescription: optStr,
    otherHasDeadline: z.enum(["Yes", "No"]).optional(),
    otherDeadlineDate: optDate,

    // Step 4
    clientCounty: requiredEnum(COUNTIES, "err_choose_county"),
    referralSource: z.enum(REFERRAL_SOURCES).or(z.literal("")).optional(),
    referralName: optStr,
    additionalNotes: z.string().max(4000).optional().or(z.literal("")),

    // Step 5
    consentLDA: z.literal(true, {
      message: "err_consent_lda",
    }),
    consentContact: z.literal(true, {
      message: "err_consent_contact",
    }),
  })
  .superRefine((data, ctx) => {
    // The only required check beyond the base fields: if the visitor said they
    // want additional services, make sure they picked at least one. Everything
    // in the per-service "Details" step is intentionally OPTIONAL so people can
    // breeze through or skip it — fewer required fields means higher completion.
    if (data.needsMoreServices === "Yes") {
      if (!data.additionalServices || data.additionalServices.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["additionalServices"],
          message: "err_additional_services",
        });
      }
    }
  });

export type IntakeData = z.infer<typeof intakeSchema>;
type FieldName = Path<IntakeData>;

const STEPS = [
  "Contact",
  "Service",
  "Details",
  "General",
  "Confirm",
] as const;

const STEP_1_FIELDS: FieldName[] = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "contactMethod",
  "bestTime",
];

const STEP_2_FIELDS: FieldName[] = [
  "primaryService",
  "needsMoreServices",
  "additionalServices",
];

const STEP_4_FIELDS: FieldName[] = [
  "clientCounty",
  "referralSource",
  "referralName",
  "additionalNotes",
];

const STEP_5_FIELDS: FieldName[] = ["consentLDA", "consentContact"];

function step3FieldsFor(
  service: IntakeData["primaryService"] | undefined,
): FieldName[] {
  switch (service) {
    case "Divorce & Family Law Documents":
      return [
        "divorceType",
        "divorceHasChildren",
        "divorceChildrenCount",
        "divorceChildrenAges",
        "divorceHasProperty",
        "divorceHasAssets",
        "divorceMarriageLength",
        "divorceFilingCounty",
        "divorceFiledPaperwork",
      ];
    case "Eviction (Unlawful Detainer) Paperwork":
      return [
        "evictionParty",
        "evictionPropertyType",
        "evictionReason",
        "evictionNoticeServed",
        "evictionNoticeType",
        "evictionNoticeDate",
        "evictionCounty",
        "evictionTenantVacated",
        "evictionRent",
      ];
    case "Living Trust Documents":
      return [
        "trustType",
        "trustHasMinors",
        "trustOwnsProperty",
        "trustPropertyCount",
        "trustHasAssets",
        "trustExistingDocs",
        "trustSuccessor",
      ];
    case "Power of Attorney":
      return [
        "poaTypes",
        "poaAgent",
        "poaHasReason",
        "poaReason",
        "poaNotarize",
      ];
    case "DMV Form Assistance":
      return [
        "dmvFormTypes",
        "dmvHasAppointment",
        "dmvAppointmentDate",
        "dmvDetails",
      ];
    case "Tax Document Organization (Clerical)":
      return [
        "taxTypes",
        "taxYear",
        "taxHasDeadline",
        "taxDeadlineDate",
        "taxNotes",
      ];
    case "Wills & Health Care Directives":
      return [
        "willsFor",
        "willsDocuments",
        "willsOwnsProperty",
        "willsHasMinors",
        "willsExistingDocs",
      ];
    case "Probate Documents":
      return [
        "probateRelation",
        "probateHasWill",
        "probateHasRealEstate",
        "probateEstateValue",
        "probateCounty",
        "probateHasDeadline",
        "probateDeadlineDate",
      ];
    case "Legal Name Change":
      return [
        "nameChangeFor",
        "nameChangeReason",
        "nameChangeCounty",
        "nameChangeHasCourtDate",
        "nameChangeCourtDate",
      ];
    case "Small Claims Paperwork":
      return [
        "smallClaimsRole",
        "smallClaimsAmount",
        "smallClaimsCounty",
        "smallClaimsHasHearing",
        "smallClaimsHearingDate",
        "smallClaimsDescription",
      ];
    case "Guardianship Documents":
      return [
        "guardianshipType",
        "guardianshipRelation",
        "guardianshipCounty",
        "guardianshipHasCourtDate",
        "guardianshipCourtDate",
      ];
    case "Deeds & Property Transfers":
      return ["deedType", "deedReason", "deedCounty", "deedPropertyCount"];
    case "Other / Not Sure":
      return ["otherDescription", "otherHasDeadline", "otherDeadlineDate"];
    default:
      return [];
  }
}

// Every Step-3 field across all branches. React Hook Form keeps values for
// conditionally-unmounted inputs, so we use this to strip fields that don't
// belong to the chosen service before submitting — otherwise switching service
// mid-form would forward a mix of branches to the CRM.
const ALL_STEP3_FIELDS: FieldName[] = [
  "divorceType", "divorceHasChildren", "divorceChildrenCount",
  "divorceChildrenAges", "divorceHasProperty", "divorceHasAssets",
  "divorceMarriageLength", "divorceFilingCounty", "divorceFiledPaperwork",
  "evictionParty", "evictionPropertyType", "evictionReason",
  "evictionNoticeServed", "evictionNoticeType", "evictionNoticeDate",
  "evictionCounty", "evictionTenantVacated", "evictionRent",
  "trustType", "trustHasMinors", "trustOwnsProperty", "trustPropertyCount",
  "trustHasAssets", "trustExistingDocs", "trustSuccessor",
  "poaTypes", "poaAgent", "poaHasReason", "poaReason", "poaNotarize",
  "dmvFormTypes", "dmvHasAppointment", "dmvAppointmentDate", "dmvDetails",
  "taxTypes", "taxYear", "taxHasDeadline", "taxDeadlineDate", "taxNotes",
  "willsFor", "willsDocuments", "willsOwnsProperty", "willsHasMinors",
  "willsExistingDocs",
  "probateRelation", "probateHasWill", "probateHasRealEstate",
  "probateEstateValue", "probateCounty", "probateHasDeadline",
  "probateDeadlineDate",
  "nameChangeFor", "nameChangeReason", "nameChangeCounty",
  "nameChangeHasCourtDate", "nameChangeCourtDate",
  "smallClaimsRole", "smallClaimsAmount", "smallClaimsCounty",
  "smallClaimsHasHearing", "smallClaimsHearingDate", "smallClaimsDescription",
  "guardianshipType", "guardianshipRelation", "guardianshipCounty",
  "guardianshipHasCourtDate", "guardianshipCourtDate",
  "deedType", "deedReason", "deedCounty", "deedPropertyCount",
  "otherDescription", "otherHasDeadline", "otherDeadlineDate",
];

// Build the payload with only the fields relevant to the chosen service and
// the active conditional toggles, so stale answers from an abandoned branch
// (or a toggle the user flipped back to "No") never reach the CRM.
function prunePayload(data: IntakeData): Record<string, unknown> {
  const active = new Set<FieldName>(step3FieldsFor(data.primaryService));
  const out: Record<string, unknown> = { ...data };
  for (const f of ALL_STEP3_FIELDS) {
    if (!active.has(f)) delete out[f];
  }
  // Clear conditional sub-fields whose parent toggle is not "Yes".
  if (out.divorceHasChildren !== "Yes") {
    delete out.divorceChildrenCount;
    delete out.divorceChildrenAges;
  }
  if (out.evictionNoticeServed !== "Yes") {
    delete out.evictionNoticeType;
    delete out.evictionNoticeDate;
  }
  if (out.trustOwnsProperty !== "Yes") delete out.trustPropertyCount;
  if (out.poaHasReason !== "Yes") delete out.poaReason;
  if (out.dmvHasAppointment !== "Yes") delete out.dmvAppointmentDate;
  if (out.taxHasDeadline !== "Yes") delete out.taxDeadlineDate;
  if (out.probateHasDeadline !== "Yes") delete out.probateDeadlineDate;
  if (out.nameChangeHasCourtDate !== "Yes") delete out.nameChangeCourtDate;
  if (out.smallClaimsHasHearing !== "Yes") delete out.smallClaimsHearingDate;
  if (out.guardianshipHasCourtDate !== "Yes") delete out.guardianshipCourtDate;
  if (out.otherHasDeadline !== "Yes") delete out.otherDeadlineDate;
  return out;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const inputBase =
  "w-full bg-white border border-[var(--color-border-light)] rounded-sm px-4 py-3 text-[var(--color-body-dark)] focus:border-[var(--color-gold)] focus:outline-none transition-colors";
const labelBase = "block text-sm font-medium text-[var(--color-navy)] mb-2";
const errorBase = "mt-1.5 text-xs text-red-600";
const optionCard =
  "inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5";
const checkCard =
  "flex items-center gap-3 px-4 py-3 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function IntakeForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{
    firstName: string;
    service: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Spam mitigation: a honeypot field that real users never see (and bots that
  // auto-fill every input will trip), plus the time the form was rendered so
  // the server can reject near-instant, bot-like submissions.
  const [honeypot, setHoneypot] = useState("");
  const [loadedAt] = useState(() => Date.now());
  // Stable id so an early "contact captured" ping and the final full
  // submission can be matched up on the receiving end.
  const [leadId] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now()),
  );
  const partialSent = useRef(false);
  const { lang, t } = useLanguage();

  const stepLabels = [
    t("intake_step_1"),
    t("intake_step_2"),
    t("intake_step_3"),
    t("intake_step_4"),
    t("intake_step_5"),
  ];

  const serviceLabel = (value: string) =>
    SERVICE_NAME_TRANSLATIONS[value]?.[lang] ?? value;

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    getValues,
    setFocus,
    getFieldState,
    formState: { errors, isSubmitted, touchedFields },
  } = useForm<IntakeData>({
    resolver: zodResolver(intakeSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      additionalServices: [],
      poaTypes: [],
      poaReason: "",
      dmvFormTypes: [],
      dmvDetails: "",
      taxTypes: [],
      taxNotes: "",
      otherDescription: "",
      divorceChildrenCount: "",
      divorceChildrenAges: "",
      trustPropertyCount: "",
      evictionNoticeDate: "",
      dmvAppointmentDate: "",
      taxDeadlineDate: "",
      probateDeadlineDate: "",
      nameChangeCourtDate: "",
      smallClaimsHearingDate: "",
      smallClaimsDescription: "",
      guardianshipCourtDate: "",
      deedPropertyCount: "",
      otherDeadlineDate: "",
      referralName: "",
      additionalNotes: "",
    },
  });

  const primaryService = watch("primaryService");
  const needsMoreServices = watch("needsMoreServices");
  const referralSource = watch("referralSource");

  // Watch all possible deadline-driving fields so the urgency banner
  // updates live as the client fills out Step 3.
  const watchedDeadline = {
    primaryService,
    dmvHasAppointment: watch("dmvHasAppointment"),
    dmvAppointmentDate: watch("dmvAppointmentDate"),
    taxHasDeadline: watch("taxHasDeadline"),
    taxDeadlineDate: watch("taxDeadlineDate"),
    probateHasDeadline: watch("probateHasDeadline"),
    probateDeadlineDate: watch("probateDeadlineDate"),
    nameChangeHasCourtDate: watch("nameChangeHasCourtDate"),
    nameChangeCourtDate: watch("nameChangeCourtDate"),
    smallClaimsHasHearing: watch("smallClaimsHasHearing"),
    smallClaimsHearingDate: watch("smallClaimsHearingDate"),
    guardianshipHasCourtDate: watch("guardianshipHasCourtDate"),
    guardianshipCourtDate: watch("guardianshipCourtDate"),
    otherHasDeadline: watch("otherHasDeadline"),
    otherDeadlineDate: watch("otherDeadlineDate"),
  };
  const deadlineDate = getDeadlineDate(watchedDeadline);
  const daysToDeadline = daysUntil(deadlineDate);

  const goNext = async () => {
    let fields: FieldName[];
    if (step === 0) fields = STEP_1_FIELDS;
    else if (step === 1) fields = STEP_2_FIELDS;
    else if (step === 2) fields = step3FieldsFor(primaryService);
    else if (step === 3) fields = STEP_4_FIELDS;
    else fields = [];

    const valid = await trigger(fields);
    if (valid) {
      // Once contact details pass on step 1, capture them immediately — a
      // visitor who abandons later is still a reachable lead (important for
      // paid traffic). Fire-and-forget; never block navigation on it.
      if (step === 0) void sendPartialLead();
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Move focus to the first invalid field so the failed "Continue" is
      // obvious (especially for keyboard/screen-reader users).
      const firstInvalid = fields.find((f) => getFieldState(f).invalid);
      if (firstInvalid) setFocus(firstInvalid);
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Best-effort early capture of contact info after step 1. Sent once; if it
  // fails we reset the flag so the next step-advance can retry.
  const sendPartialLead = async () => {
    if (partialSent.current) return;
    partialSent.current = true;
    const v = getValues();
    try {
      await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partial: true,
          leadId,
          firstName: v.firstName,
          lastName: v.lastName,
          phone: v.phone,
          email: v.email,
          contactMethod: v.contactMethod,
          bestTime: v.bestTime,
          website: honeypot,
          elapsedMs: Date.now() - loadedAt,
        }),
      });
    } catch {
      partialSent.current = false;
    }
  };

  const onSubmit = async (data: IntakeData) => {
    if (submitting) return; // guard against a fast double-click
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...prunePayload(data),
          leadId,
          lang,
          website: honeypot,
          elapsedMs: Date.now() - loadedAt,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      // GA4 conversion event. No-op if analytics isn't configured (the event
      // simply queues in the dataLayer with no consumer).
      if (process.env.NEXT_PUBLIC_GA_ID) {
        sendGAEvent("event", "generate_lead", {
          service: data.primaryService,
        });
      }
      // Meta Pixel conversion event for ad optimization/reporting. Guarded on
      // the pixel ID so it stays off in dev/preview, mirroring MetaPixel.tsx.
      // eventID must be the leadId: the server sends the same value as
      // event_id on its Conversions API Lead event, and Meta deduplicates the
      // browser/server pair by (event name, event id).
      if (process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
        window.fbq?.(
          "track",
          "Lead",
          { content_name: data.primaryService },
          { eventID: leadId },
        );
      }
      setSubmitted({
        firstName: data.firstName,
        service: data.primaryService,
      });
    } catch {
      setSubmitError("network");
    } finally {
      setSubmitting(false);
    }
  };

  // Called when a submit attempt fails validation. Without this, a blocked
  // submit is silent — the button looks dead, especially if the offending
  // field (e.g. an unchecked consent box) is just below the fold. Jump the
  // user to the step holding the first error and scroll it into view so the
  // reason is always visible.
  const onInvalid = (formErrors: typeof errors) => {
    const errored = Object.keys(formErrors) as FieldName[];
    if (errored.length === 0) return;
    const stepForField = (field: FieldName): number => {
      if (STEP_1_FIELDS.includes(field)) return 0;
      if (STEP_2_FIELDS.includes(field)) return 1;
      if (step3FieldsFor(primaryService).includes(field)) return 2;
      if (STEP_4_FIELDS.includes(field)) return 3;
      return 4; // consent / confirm step
    };
    const targetStep = Math.min(...errored.map(stepForField));
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    const checklist =
      SERVICE_CHECKLISTS[submitted.service] ?? SERVICE_CHECKLISTS["default"];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white border border-[var(--color-border-light)] rounded-sm p-8 md:p-12 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-[var(--color-gold)] flex items-center justify-center mb-6">
            <Check
              className="h-10 w-10 text-[var(--color-navy)]"
              aria-hidden
              strokeWidth={2.5}
            />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-navy)] mb-4">
            {t("success_thank_you_lead")} {submitted.firstName}.{" "}
            {t("success_thank_you_tail")}
          </h2>
          <p className="text-[var(--color-body-dark)] text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            {t("success_body")}
          </p>
          <p className="text-[var(--color-body-dark)] opacity-80">
            {t("success_contact_lead")}{" "}
            <CallLink
              source="intake_success"
              className="text-[var(--color-navy)] font-medium underline decoration-[var(--color-gold)] underline-offset-4"
            >
              {BUSINESS.phone}
            </CallLink>{" "}
            {t("success_contact_mid")}{" "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-[var(--color-navy)] font-medium underline decoration-[var(--color-gold)] underline-offset-4 break-all"
            >
              {BUSINESS.email}
            </a>
            .
          </p>
        </div>

        <div className="mt-6 border border-[var(--color-gold)]/40 rounded-sm bg-[var(--color-navy-mid)] p-6 md:p-8">
          <h3 className="font-serif text-xl md:text-2xl text-[var(--color-gold)] mb-2">
            {checklistTitle(checklist, lang)}
          </h3>
          <p className="text-sm text-[var(--color-body-light)] mb-5">
            {checklistIntro(checklist, lang)}
          </p>
          <ul className="space-y-2.5">
            {checklistItems(checklist, lang).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-[var(--color-body-light)]"
              >
                <Check
                  className="h-4 w-4 text-[var(--color-gold)] mt-0.5 shrink-0"
                  aria-hidden
                  strokeWidth={2.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--color-muted-light)] mt-5 italic leading-relaxed">
            {checklistNote(checklist, lang)}
          </p>
        </div>
      </motion.div>
    );
  }

  const progressPct = ((step + 1) / STEPS.length) * 100;

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
      {/* Honeypot — visually hidden and skipped by keyboard/screen readers.
          Real users never fill it; naive bots that populate every field do,
          which lets the server discard the submission. Not part of the
          validated schema. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="website-url">Website</label>
        <input
          id="website-url"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-70">
            {t("intake_step_label")} {step + 1} {t("intake_step_of")}{" "}
            {STEPS.length} — {stepLabels[step]}
          </p>
          <p className="text-xs text-[var(--color-navy)] opacity-70">
            {Math.round(progressPct)}%
          </p>
        </div>
        <div className="h-1.5 bg-[var(--color-border-light)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-gold)]"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="bg-white border border-[var(--color-border-light)] rounded-sm p-6 md:p-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepWrap key="step-0">
              <StepHeader
                title={t("intake_h_contact")}
                subtitle={t("intake_sub_contact")}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  id="firstName"
                  label={t("intake_f_first")}
                  required
                  error={tErr(errors.firstName?.message, t)}
                >
                  <input
                    id="firstName"
                    autoComplete="given-name"
                    {...register("firstName")}
                    className={inputBase}
                  />
                </Field>
                <Field
                  id="lastName"
                  label={t("intake_f_last")}
                  required
                  error={tErr(errors.lastName?.message, t)}
                >
                  <input
                    id="lastName"
                    autoComplete="family-name"
                    {...register("lastName")}
                    className={inputBase}
                  />
                </Field>
                <Field
                  id="phone"
                  label={t("intake_f_phone")}
                  required
                  error={tErr(errors.phone?.message, t)}
                >
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className={inputBase}
                  />
                </Field>
                <Field
                  id="email"
                  label={t("intake_f_email")}
                  required
                  error={tErr(errors.email?.message, t)}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className={inputBase}
                  />
                </Field>
              </div>

              <fieldset className="mt-7">
                <legend className={labelBase}>
                  {t("intake_f_contact_method")} <Req />
                </legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {(
                    [
                      ["Phone", t("intake_opt_phone")],
                      ["Email", t("intake_opt_email")],
                      ["Text", t("intake_opt_text")],
                    ] as const
                  ).map(([value, label]) => (
                    <label key={value} className={optionCard}>
                      <input
                        type="radio"
                        value={value}
                        {...register("contactMethod")}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.contactMethod && (
                  <p className={errorBase}>{tErr(errors.contactMethod.message, t)}</p>
                )}
              </fieldset>

              <div className="mt-7">
                <label htmlFor="bestTime" className={labelBase}>
                  {t("intake_f_best_time")} <Req />
                </label>
                <select
                  id="bestTime"
                  {...register("bestTime")}
                  className={inputBase}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("intake_select_time")}
                  </option>
                  <option value="Morning">{t("intake_opt_morning")}</option>
                  <option value="Afternoon">{t("intake_opt_afternoon")}</option>
                  <option value="LateAfternoon">{t("intake_opt_late")}</option>
                </select>
                {errors.bestTime && (
                  <p className={errorBase}>{tErr(errors.bestTime.message, t)}</p>
                )}
              </div>
            </StepWrap>
          )}

          {step === 1 && (
            <StepWrap key="step-1">
              <StepHeader
                title={t("intake_h_service")}
                subtitle={t("intake_sub_service")}
              />

              <fieldset>
                <legend className={labelBase}>
                  {t("intake_f_primary_service")} <Req />
                </legend>
                <div className="grid grid-cols-1 gap-2.5">
                  {PRIMARY_SERVICES.map((svc) => (
                    <label key={svc} className={checkCard}>
                      <input
                        type="radio"
                        value={svc}
                        {...register("primaryService")}
                        className="accent-[var(--color-gold)] h-4 w-4"
                      />
                      <span className="text-sm">{serviceLabel(svc)}</span>
                    </label>
                  ))}
                </div>
                {errors.primaryService && (
                  <p className={errorBase}>{tErr(errors.primaryService.message, t)}</p>
                )}
              </fieldset>

              <fieldset className="mt-6">
                <legend className={labelBase}>
                  {t("intake_f_needs_more")} <Req />
                </legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {(
                    [
                      ["Yes", t("intake_yes")],
                      ["No", t("intake_no")],
                    ] as const
                  ).map(([value, label]) => (
                    <label key={value} className={optionCard}>
                      <input
                        type="radio"
                        value={value}
                        {...register("needsMoreServices")}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.needsMoreServices && (
                  <p className={errorBase}>{tErr(errors.needsMoreServices.message, t)}</p>
                )}
              </fieldset>

              {needsMoreServices === "Yes" && (
                <fieldset className="mt-6">
                  <legend className={labelBase}>
                    {t("intake_f_additional_services")} <Req />
                  </legend>
                  <Controller
                    control={control}
                    name="additionalServices"
                    render={({ field }) => (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {PRIMARY_SERVICES.filter(
                          (s) => s !== primaryService,
                        ).map((svc) => {
                          const checked = field.value?.includes(svc) ?? false;
                          return (
                            <label key={svc} className={checkCard}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  const next = e.target.checked
                                    ? [...(field.value ?? []), svc]
                                    : (field.value ?? []).filter(
                                        (v) => v !== svc,
                                      );
                                  field.onChange(next);
                                }}
                                className="accent-[var(--color-gold)] h-4 w-4"
                              />
                              <span className="text-sm">{serviceLabel(svc)}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  />
                  {errors.additionalServices && (
                    <p className={errorBase}>
                      {tErr(errors.additionalServices.message as string, t)}
                    </p>
                  )}
                </fieldset>
              )}
            </StepWrap>
          )}

          {step === 2 && (
            <StepWrap key="step-2">
              <StepHeader
                title={t("intake_h_details")}
                subtitle={t("intake_sub_details")}
              />
              <p className="-mt-4 mb-8 text-sm text-[var(--color-body-dark)] bg-[var(--color-offwhite)] border-l-2 border-[var(--color-gold)] px-4 py-3">
                {t("intake_details_optional")}
              </p>
              <UrgencyBanner days={daysToDeadline} t={t} />
              <BranchFields
                service={primaryService}
                register={register}
                control={control}
                watch={watch}
                errors={errors}
                t={t}
                lang={lang}
              />
            </StepWrap>
          )}

          {step === 3 && (
            <StepWrap key="step-3">
              <StepHeader
                title={t("intake_h_general")}
                subtitle={t("intake_sub_general")}
              />

              <div>
                <label htmlFor="clientCounty" className={labelBase}>
                  {t("intake_f_client_county")} <Req />
                </label>
                <select
                  id="clientCounty"
                  {...register("clientCounty")}
                  className={inputBase}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("intake_select_county")}
                  </option>
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {optionLabel(c, lang)}
                    </option>
                  ))}
                </select>
                {errors.clientCounty && (
                  <p className={errorBase}>{tErr(errors.clientCounty.message, t)}</p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="referralSource" className={labelBase}>
                  {t("intake_f_referral_source")}
                </label>
                <select
                  id="referralSource"
                  {...register("referralSource")}
                  className={inputBase}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("intake_select_source")}
                  </option>
                  {REFERRAL_SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {optionLabel(s, lang)}
                    </option>
                  ))}
                </select>
                {errors.referralSource && (
                  <p className={errorBase}>{tErr(errors.referralSource.message, t)}</p>
                )}
              </div>

              {referralSource === "Referral" && (
                <div className="mt-6">
                  <label htmlFor="referralName" className={labelBase}>
                    {t("intake_f_referral_name")} <Req />
                  </label>
                  <input
                    id="referralName"
                    {...register("referralName")}
                    className={inputBase}
                  />
                  {errors.referralName && (
                    <p className={errorBase}>{tErr(errors.referralName.message, t)}</p>
                  )}
                </div>
              )}

              <div className="mt-6">
                <label htmlFor="additionalNotes" className={labelBase}>
                  {t("intake_f_additional_notes")}
                </label>
                <textarea
                  id="additionalNotes"
                  rows={5}
                  {...register("additionalNotes")}
                  className={inputBase}
                />
              </div>
            </StepWrap>
          )}

          {step === 4 && (
            <StepWrap key="step-4">
              <StepHeader
                title={t("intake_h_confirm")}
                subtitle={t("intake_sub_confirm")}
              />

              <ReviewSummary
                data={prunePayload(getValues()) as Partial<IntakeData>}
                t={t}
                lang={lang}
              />

              <div className="mt-8 space-y-4">
                <label className="flex items-start gap-3 p-4 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5">
                  <input
                    type="checkbox"
                    {...register("consentLDA")}
                    className="accent-[var(--color-gold)] h-4 w-4 mt-1 shrink-0"
                  />
                  <span className="text-sm text-[var(--color-body-dark)] leading-relaxed">
                    {t("intake_consent_lda")} <Req />
                  </span>
                </label>
                {errors.consentLDA && (isSubmitted || touchedFields.consentLDA) && (
                  <p className={errorBase}>{t("err_consent_lda")}</p>
                )}

                <label className="flex items-start gap-3 p-4 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5">
                  <input
                    type="checkbox"
                    {...register("consentContact")}
                    className="accent-[var(--color-gold)] h-4 w-4 mt-1 shrink-0"
                  />
                  <span className="text-sm text-[var(--color-body-dark)] leading-relaxed">
                    {t("intake_consent_contact")} <Req />
                  </span>
                </label>
                {errors.consentContact && (isSubmitted || touchedFields.consentContact) && (
                  <p className={errorBase}>{t("err_consent_contact")}</p>
                )}
              </div>

              {submitError && (
                <div className="mt-6 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-900">
                  {t("intake_submit_error_lead")}{" "}
                  <CallLink
                    source="intake_error"
                    className="font-medium underline underline-offset-2"
                  >
                    {BUSINESS.phone}
                  </CallLink>{" "}
                  {t("intake_submit_error_mid")}{" "}
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="font-medium underline underline-offset-2 break-all"
                  >
                    {BUSINESS.email}
                  </a>{" "}
                  {t("intake_submit_error_tail")}
                </div>
              )}
            </StepWrap>
          )}
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {step === 0 ? (
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors text-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {t("intake_btn_back_home")}
          </Link>
        ) : (
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-3 text-[var(--color-navy)] hover:text-[var(--color-gold)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {t("intake_btn_back")}
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 bg-[var(--color-navy)] hover:bg-[var(--color-navy-mid)] text-white px-6 py-3 rounded-sm text-sm font-medium tracking-wide transition-colors"
          >
            {t("intake_btn_continue")}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-navy)] px-7 py-3.5 rounded-sm font-medium tracking-wide transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t("intake_btn_submitting")}
              </>
            ) : (
              t("intake_btn_submit")
            )}
          </button>
        )}
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Small UI helpers
// ---------------------------------------------------------------------------

function Req() {
  return <span className="text-red-600">*</span>;
}

function UrgencyBanner({
  days,
  t,
}: {
  days: number | null;
  t: (key: import("@/lib/translations").TranslationKey) => string;
}) {
  if (days === null || days < 0) return null;
  if (days <= 7) {
    return (
      <div className="mb-6 flex items-start gap-3 border-l-4 border-red-600 bg-red-50 p-4 rounded-sm">
        <AlertTriangle
          className="h-5 w-5 text-red-600 shrink-0 mt-0.5"
          aria-hidden
        />
        <div className="text-sm text-red-900 leading-relaxed">
          <strong>{t("urgency_red_strong")}</strong> {t("urgency_red_body_1")}{" "}
          <CallLink
            source="intake_urgency"
            className="font-semibold underline underline-offset-2"
          >
            {BUSINESS.phone}
          </CallLink>{" "}
          {t("urgency_red_body_2")}
        </div>
      </div>
    );
  }
  if (days <= 14) {
    return (
      <div className="mb-6 flex items-start gap-3 border-l-4 border-amber-500 bg-amber-50 p-4 rounded-sm">
        <CalendarClock
          className="h-5 w-5 text-amber-700 shrink-0 mt-0.5"
          aria-hidden
        />
        <div className="text-sm text-amber-900 leading-relaxed">
          <strong>{t("urgency_amber_strong")}</strong> {t("urgency_amber_body")}
        </div>
      </div>
    );
  }
  return null;
}

function StepWrap({
  children,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: { children: React.ReactNode } & Record<string, any>) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-1">
        {title}
      </h2>
      <p className="text-[var(--color-body-dark)] opacity-80 mb-8">{subtitle}</p>
    </>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelBase}>
        {label} {required && <Req />}
      </label>
      {children}
      {error && <p className={errorBase}>{error}</p>}
    </div>
  );
}

type RegisterFn = ReturnType<typeof useForm<IntakeData>>["register"];

function RadioGroup({
  legend,
  options,
  name,
  register,
  required,
  error,
  className,
  lang,
}: {
  legend: string;
  options: readonly string[];
  name: FieldName;
  register: RegisterFn;
  required?: boolean;
  error?: string;
  className?: string;
  lang: Language;
}) {
  return (
    <fieldset className={className}>
      <legend className={labelBase}>
        {legend} {required && <Req />}
      </legend>
      <div className="flex flex-wrap gap-3 mt-1">
        {options.map((opt) => (
          <label key={opt} className={optionCard}>
            <input
              type="radio"
              value={opt}
              {...register(name)}
              className="accent-[var(--color-gold)]"
            />
            <span className="text-sm">{optionLabel(opt, lang)}</span>
          </label>
        ))}
      </div>
      {error && <p className={errorBase}>{error}</p>}
    </fieldset>
  );
}

function Select({
  id,
  label,
  required,
  error,
  options,
  register,
  name,
  placeholder,
  className,
  lang,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  options: readonly string[];
  register: RegisterFn;
  name: FieldName;
  placeholder?: string;
  className?: string;
  lang: Language;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelBase}>
        {label} {required && <Req />}
      </label>
      <select
        id={id}
        {...register(name)}
        className={inputBase}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder ?? (lang === "es" ? "Seleccione…" : "Select…")}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {optionLabel(o, lang)}
          </option>
        ))}
      </select>
      {error && <p className={errorBase}>{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Branch fields
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BranchProps = {
  service: IntakeData["primaryService"] | undefined;
  register: RegisterFn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  t: (key: TranslationKey) => string;
  lang: Language;
};

function BranchFields({
  service,
  register,
  control,
  watch,
  errors,
  t,
  lang,
}: BranchProps) {
  if (!service) {
    return (
      <p className="text-sm text-[var(--color-body-dark)] opacity-70">
        {t("branch_no_service")}
      </p>
    );
  }

  switch (service) {
    case "Divorce & Family Law Documents":
      return (
        <DivorceBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Eviction (Unlawful Detainer) Paperwork":
      return (
        <EvictionBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Living Trust Documents":
      return (
        <TrustBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Power of Attorney":
      return (
        <PoaBranch
          register={register}
          control={control}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "DMV Form Assistance":
      return (
        <DmvBranch
          register={register}
          control={control}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Tax Document Organization (Clerical)":
      return (
        <TaxBranch
          register={register}
          control={control}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Wills & Health Care Directives":
      return (
        <WillsBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Probate Documents":
      return (
        <ProbateBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Legal Name Change":
      return (
        <NameChangeBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Small Claims Paperwork":
      return (
        <SmallClaimsBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Guardianship Documents":
      return (
        <GuardianshipBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Deeds & Property Transfers":
      return (
        <DeedsBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
    case "Other / Not Sure":
      return (
        <OtherBranch
          register={register}
          watch={watch}
          errors={errors}
          t={t}
          lang={lang}
        />
      );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DivorceBranch({ register, watch, errors, t, lang }: any) {
  const hasChildren = watch("divorceHasChildren");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("div_q_type")}
        options={["Uncontested", "Contested", "Not sure yet"]}
        name="divorceType"
        register={register}
        error={tErr(errors.divorceType?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("div_q_children")}
        options={["Yes", "No"]}
        name="divorceHasChildren"
        register={register}
        error={tErr(errors.divorceHasChildren?.message, t)}
        lang={lang}
      />
      {hasChildren === "Yes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            id="divorceChildrenCount"
            label={t("div_q_children_count")}
            error={tErr(errors.divorceChildrenCount?.message, t)}
          >
            <input
              id="divorceChildrenCount"
              type="number"
              min={1}
              {...register("divorceChildrenCount")}
              className={inputBase}
            />
          </Field>
          <Field
            id="divorceChildrenAges"
            label={t("div_q_children_ages")}
            error={tErr(errors.divorceChildrenAges?.message, t)}
          >
            <input
              id="divorceChildrenAges"
              {...register("divorceChildrenAges")}
              className={inputBase}
              placeholder={t("div_q_children_ages_placeholder")}
            />
          </Field>
        </div>
      )}
      <RadioGroup
        legend={t("div_q_property")}
        options={["Yes", "No", "Not sure"]}
        name="divorceHasProperty"
        register={register}
        error={tErr(errors.divorceHasProperty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("div_q_assets")}
        options={["Yes", "No", "Not sure"]}
        name="divorceHasAssets"
        register={register}
        error={tErr(errors.divorceHasAssets?.message, t)}
        lang={lang}
      />
      <Select
        id="divorceMarriageLength"
        label={t("div_q_marriage_length")}
        options={MARRIAGE_LENGTHS}
        register={register}
        name="divorceMarriageLength"
        placeholder={t("div_q_marriage_placeholder")}
        error={tErr(errors.divorceMarriageLength?.message, t)}
        lang={lang}
      />
      <Select
        id="divorceFilingCounty"
        label={t("div_q_filing_county")}
        options={COUNTIES}
        register={register}
        name="divorceFilingCounty"
        placeholder={t("div_q_filing_county_placeholder")}
        error={tErr(errors.divorceFilingCounty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("div_q_filed_paperwork")}
        options={["Yes", "No"]}
        name="divorceFiledPaperwork"
        register={register}
        error={tErr(errors.divorceFiledPaperwork?.message, t)}
        lang={lang}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EvictionBranch({ register, watch, errors, t, lang }: any) {
  const noticeServed = watch("evictionNoticeServed");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("evi_q_party")}
        options={["Landlord", "Tenant"]}
        name="evictionParty"
        register={register}
        error={tErr(errors.evictionParty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("evi_q_property_type")}
        options={["Residential", "Commercial"]}
        name="evictionPropertyType"
        register={register}
        error={tErr(errors.evictionPropertyType?.message, t)}
        lang={lang}
      />
      <Select
        id="evictionReason"
        label={t("evi_q_reason")}
        options={EVICTION_REASONS}
        register={register}
        name="evictionReason"
        placeholder={t("evi_q_reason_placeholder")}
        error={tErr(errors.evictionReason?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("evi_q_notice_served")}
        options={["Yes", "No"]}
        name="evictionNoticeServed"
        register={register}
        error={tErr(errors.evictionNoticeServed?.message, t)}
        lang={lang}
      />
      {noticeServed === "Yes" && (
        <>
          <Select
            id="evictionNoticeType"
            label={t("evi_q_notice_type")}
            options={NOTICE_TYPES}
            register={register}
            name="evictionNoticeType"
            placeholder={t("evi_q_notice_type_placeholder")}
            error={tErr(errors.evictionNoticeType?.message, t)}
            lang={lang}
          />
          <Field
            id="evictionNoticeDate"
            label={t("evi_q_notice_date")}
            error={tErr(errors.evictionNoticeDate?.message, t)}
          >
            <input
              id="evictionNoticeDate"
              type="date"
              {...register("evictionNoticeDate")}
              className={inputBase}
            />
          </Field>
        </>
      )}
      <Select
        id="evictionCounty"
        label={t("evi_q_county")}
        options={COUNTIES}
        register={register}
        name="evictionCounty"
        placeholder={t("evi_q_county_placeholder")}
        error={tErr(errors.evictionCounty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("evi_q_tenant_vacated")}
        options={["Yes", "No", "Partially"]}
        name="evictionTenantVacated"
        register={register}
        error={tErr(errors.evictionTenantVacated?.message, t)}
        lang={lang}
      />
      <Select
        id="evictionRent"
        label={t("evi_q_rent")}
        options={RENT_RANGES}
        register={register}
        name="evictionRent"
        placeholder={t("evi_q_rent_placeholder")}
        error={tErr(errors.evictionRent?.message, t)}
        lang={lang}
      />
    </div>
  );
}

function CheckboxGrid({
  legend,
  options,
  name,
  control,
  required,
  error,
  lang,
}: {
  legend: string;
  options: readonly string[];
  name: FieldName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  required?: boolean;
  error?: string;
  lang: Language;
}) {
  return (
    <fieldset>
      <legend className={labelBase}>
        {legend} {required && <Req />}
      </legend>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {options.map((opt) => {
              const value: string[] = Array.isArray(field.value)
                ? field.value
                : [];
              const checked = value.includes(opt);
              return (
                <label key={opt} className={checkCard}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...value, opt]
                        : value.filter((v) => v !== opt);
                      field.onChange(next);
                    }}
                    className="accent-[var(--color-gold)] h-4 w-4"
                  />
                  <span className="text-sm">{optionLabel(opt, lang)}</span>
                </label>
              );
            })}
          </div>
        )}
      />
      {error && <p className={errorBase}>{error}</p>}
    </fieldset>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TrustBranch({ register, watch, errors, t, lang }: any) {
  const ownsProperty = watch("trustOwnsProperty");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("trust_q_type")}
        options={["Individual", "Married couple"]}
        name="trustType"
        register={register}
        error={tErr(errors.trustType?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("trust_q_minors")}
        options={["Yes", "No"]}
        name="trustHasMinors"
        register={register}
        error={tErr(errors.trustHasMinors?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("trust_q_property")}
        options={["Yes", "No"]}
        name="trustOwnsProperty"
        register={register}
        error={tErr(errors.trustOwnsProperty?.message, t)}
        lang={lang}
      />
      {ownsProperty === "Yes" && (
        <Field
          id="trustPropertyCount"
          label={t("trust_q_property_count")}
          error={tErr(errors.trustPropertyCount?.message, t)}
        >
          <input
            id="trustPropertyCount"
            type="number"
            min={1}
            {...register("trustPropertyCount")}
            className={inputBase}
          />
        </Field>
      )}
      <RadioGroup
        legend={t("trust_q_assets")}
        options={["Yes", "No", "Not sure"]}
        name="trustHasAssets"
        register={register}
        error={tErr(errors.trustHasAssets?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("trust_q_existing")}
        options={["Yes", "No", "Not sure"]}
        name="trustExistingDocs"
        register={register}
        error={tErr(errors.trustExistingDocs?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("trust_q_successor")}
        options={TRUST_SUCCESSOR_OPTIONS}
        name="trustSuccessor"
        register={register}
        error={tErr(errors.trustSuccessor?.message, t)}
        lang={lang}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PoaBranch({ register, control, watch, errors, t, lang }: any) {
  const hasReason = watch("poaHasReason");
  return (
    <div className="space-y-6">
      <CheckboxGrid
        legend={t("poa_q_types")}
        options={POA_TYPES}
        name="poaTypes"
        control={control}
        error={tErr(errors.poaTypes?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("poa_q_agent")}
        options={AGENT_OPTIONS}
        name="poaAgent"
        register={register}
        error={tErr(errors.poaAgent?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("poa_q_reason_yn")}
        options={["Yes", "No"]}
        name="poaHasReason"
        register={register}
        error={tErr(errors.poaHasReason?.message, t)}
        lang={lang}
      />
      {hasReason === "Yes" && (
        <Field
          id="poaReason"
          label={t("poa_q_reason")}
          error={tErr(errors.poaReason?.message, t)}
        >
          <textarea
            id="poaReason"
            rows={3}
            {...register("poaReason")}
            className={inputBase}
            placeholder={t("poa_q_reason_placeholder")}
          />
        </Field>
      )}
      <RadioGroup
        legend={t("poa_q_notarize")}
        options={["Yes", "No", "Not sure"]}
        name="poaNotarize"
        register={register}
        error={tErr(errors.poaNotarize?.message, t)}
        lang={lang}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DmvBranch({ register, control, watch, errors, t, lang }: any) {
  const hasAppt = watch("dmvHasAppointment");
  return (
    <div className="space-y-6">
      <CheckboxGrid
        legend={t("dmv_q_forms")}
        options={DMV_FORM_OPTIONS}
        name="dmvFormTypes"
        control={control}
        error={tErr(errors.dmvFormTypes?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("dmv_q_appointment")}
        options={["Yes", "No"]}
        name="dmvHasAppointment"
        register={register}
        error={tErr(errors.dmvHasAppointment?.message, t)}
        lang={lang}
      />
      {hasAppt === "Yes" && (
        <Field
          id="dmvAppointmentDate"
          label={t("dmv_q_appointment_date")}
          error={tErr(errors.dmvAppointmentDate?.message, t)}
        >
          <input
            id="dmvAppointmentDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("dmvAppointmentDate")}
            className={inputBase}
          />
        </Field>
      )}
      <Field
        id="dmvDetails"
        label={t("dmv_q_details")}
        error={tErr(errors.dmvDetails?.message, t)}
      >
        <textarea
          id="dmvDetails"
          rows={4}
          {...register("dmvDetails")}
          className={inputBase}
          placeholder={t("placeholder_optional")}
        />
      </Field>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TaxBranch({ register, control, watch, errors, t, lang }: any) {
  const hasDeadline = watch("taxHasDeadline");
  return (
    <div className="space-y-6">
      <CheckboxGrid
        legend={t("tax_q_types")}
        options={TAX_TYPE_OPTIONS}
        name="taxTypes"
        control={control}
        error={tErr(errors.taxTypes?.message, t)}
        lang={lang}
      />
      <Select
        id="taxYear"
        label={t("tax_q_year")}
        options={TAX_YEARS}
        register={register}
        name="taxYear"
        placeholder={t("tax_q_year_placeholder")}
        error={tErr(errors.taxYear?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("tax_q_deadline")}
        options={["Yes", "No"]}
        name="taxHasDeadline"
        register={register}
        error={tErr(errors.taxHasDeadline?.message, t)}
        lang={lang}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="taxDeadlineDate"
          label={t("tax_q_deadline_date")}
          error={tErr(errors.taxDeadlineDate?.message, t)}
        >
          <input
            id="taxDeadlineDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("taxDeadlineDate")}
            className={inputBase}
          />
        </Field>
      )}
      <Field
        id="taxNotes"
        label={t("tax_q_notes")}
        error={tErr(errors.taxNotes?.message, t)}
      >
        <textarea
          id="taxNotes"
          rows={4}
          {...register("taxNotes")}
          className={inputBase}
          placeholder={t("placeholder_optional")}
        />
      </Field>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OtherBranch({ register, watch, errors, t, lang }: any) {
  const hasDeadline = watch("otherHasDeadline");
  return (
    <div className="space-y-6">
      <Field
        id="otherDescription"
        label={t("other_q_description")}
        error={tErr(errors.otherDescription?.message, t)}
      >
        <textarea
          id="otherDescription"
          rows={5}
          {...register("otherDescription")}
          className={inputBase}
        />
      </Field>
      <RadioGroup
        legend={t("other_q_deadline")}
        options={["Yes", "No"]}
        name="otherHasDeadline"
        register={register}
        error={tErr(errors.otherHasDeadline?.message, t)}
        lang={lang}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="otherDeadlineDate"
          label={t("other_q_deadline_date")}
          error={tErr(errors.otherDeadlineDate?.message, t)}
        >
          <input
            id="otherDeadlineDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("otherDeadlineDate")}
            className={inputBase}
          />
        </Field>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WillsBranch({ register, errors, t, lang }: any) {
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("wills_q_for")}
        options={WILLS_FOR_OPTIONS}
        name="willsFor"
        register={register}
        error={tErr(errors.willsFor?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("wills_q_documents")}
        options={WILLS_DOC_OPTIONS}
        name="willsDocuments"
        register={register}
        error={tErr(errors.willsDocuments?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("wills_q_property")}
        options={["Yes", "No"]}
        name="willsOwnsProperty"
        register={register}
        error={tErr(errors.willsOwnsProperty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("wills_q_minors")}
        options={["Yes", "No"]}
        name="willsHasMinors"
        register={register}
        error={tErr(errors.willsHasMinors?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("wills_q_existing")}
        options={["Yes", "No", "Not sure"]}
        name="willsExistingDocs"
        register={register}
        error={tErr(errors.willsExistingDocs?.message, t)}
        lang={lang}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProbateBranch({ register, watch, errors, t, lang }: any) {
  const hasDeadline = watch("probateHasDeadline");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("prob_q_relation")}
        options={PROBATE_RELATIONS}
        name="probateRelation"
        register={register}
        error={tErr(errors.probateRelation?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("prob_q_will")}
        options={["Yes", "No", "Not sure"]}
        name="probateHasWill"
        register={register}
        error={tErr(errors.probateHasWill?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("prob_q_realestate")}
        options={["Yes", "No", "Not sure"]}
        name="probateHasRealEstate"
        register={register}
        error={tErr(errors.probateHasRealEstate?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("prob_q_value")}
        options={ESTATE_VALUE_RANGES}
        name="probateEstateValue"
        register={register}
        error={tErr(errors.probateEstateValue?.message, t)}
        lang={lang}
      />
      <Select
        id="probateCounty"
        label={t("prob_q_county")}
        options={COUNTIES}
        register={register}
        name="probateCounty"
        error={tErr(errors.probateCounty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("prob_q_deadline")}
        options={["Yes", "No"]}
        name="probateHasDeadline"
        register={register}
        error={tErr(errors.probateHasDeadline?.message, t)}
        lang={lang}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="probateDeadlineDate"
          label={t("prob_q_deadline_date")}
          error={tErr(errors.probateDeadlineDate?.message, t)}
        >
          <input
            id="probateDeadlineDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("probateDeadlineDate")}
            className={inputBase}
          />
        </Field>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NameChangeBranch({ register, watch, errors, t, lang }: any) {
  const hasCourtDate = watch("nameChangeHasCourtDate");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("name_q_for")}
        options={NAME_CHANGE_FOR}
        name="nameChangeFor"
        register={register}
        error={tErr(errors.nameChangeFor?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("name_q_reason")}
        options={NAME_CHANGE_REASONS}
        name="nameChangeReason"
        register={register}
        error={tErr(errors.nameChangeReason?.message, t)}
        lang={lang}
      />
      <Select
        id="nameChangeCounty"
        label={t("name_q_county")}
        options={COUNTIES}
        register={register}
        name="nameChangeCounty"
        error={tErr(errors.nameChangeCounty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("name_q_courtdate")}
        options={["Yes", "No"]}
        name="nameChangeHasCourtDate"
        register={register}
        error={tErr(errors.nameChangeHasCourtDate?.message, t)}
        lang={lang}
      />
      {hasCourtDate === "Yes" && (
        <Field
          id="nameChangeCourtDate"
          label={t("name_q_courtdate_date")}
          error={tErr(errors.nameChangeCourtDate?.message, t)}
        >
          <input
            id="nameChangeCourtDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("nameChangeCourtDate")}
            className={inputBase}
          />
        </Field>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SmallClaimsBranch({ register, watch, errors, t, lang }: any) {
  const hasHearing = watch("smallClaimsHasHearing");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("sc_q_role")}
        options={SMALL_CLAIMS_ROLES}
        name="smallClaimsRole"
        register={register}
        error={tErr(errors.smallClaimsRole?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("sc_q_amount")}
        options={SMALL_CLAIMS_AMOUNTS}
        name="smallClaimsAmount"
        register={register}
        error={tErr(errors.smallClaimsAmount?.message, t)}
        lang={lang}
      />
      <Select
        id="smallClaimsCounty"
        label={t("sc_q_county")}
        options={COUNTIES}
        register={register}
        name="smallClaimsCounty"
        error={tErr(errors.smallClaimsCounty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("sc_q_hearing")}
        options={["Yes", "No"]}
        name="smallClaimsHasHearing"
        register={register}
        error={tErr(errors.smallClaimsHasHearing?.message, t)}
        lang={lang}
      />
      {hasHearing === "Yes" && (
        <Field
          id="smallClaimsHearingDate"
          label={t("sc_q_hearing_date")}
          error={tErr(errors.smallClaimsHearingDate?.message, t)}
        >
          <input
            id="smallClaimsHearingDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("smallClaimsHearingDate")}
            className={inputBase}
          />
        </Field>
      )}
      <Field
        id="smallClaimsDescription"
        label={t("sc_q_desc")}
        error={tErr(errors.smallClaimsDescription?.message, t)}
      >
        <textarea
          id="smallClaimsDescription"
          rows={4}
          {...register("smallClaimsDescription")}
          className={inputBase}
        />
      </Field>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GuardianshipBranch({ register, watch, errors, t, lang }: any) {
  const hasCourtDate = watch("guardianshipHasCourtDate");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("guard_q_type")}
        options={GUARDIANSHIP_TYPES}
        name="guardianshipType"
        register={register}
        error={tErr(errors.guardianshipType?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("guard_q_relation")}
        options={GUARDIANSHIP_RELATIONS}
        name="guardianshipRelation"
        register={register}
        error={tErr(errors.guardianshipRelation?.message, t)}
        lang={lang}
      />
      <Select
        id="guardianshipCounty"
        label={t("guard_q_county")}
        options={COUNTIES}
        register={register}
        name="guardianshipCounty"
        error={tErr(errors.guardianshipCounty?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("guard_q_courtdate")}
        options={["Yes", "No"]}
        name="guardianshipHasCourtDate"
        register={register}
        error={tErr(errors.guardianshipHasCourtDate?.message, t)}
        lang={lang}
      />
      {hasCourtDate === "Yes" && (
        <Field
          id="guardianshipCourtDate"
          label={t("guard_q_courtdate_date")}
          error={tErr(errors.guardianshipCourtDate?.message, t)}
        >
          <input
            id="guardianshipCourtDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("guardianshipCourtDate")}
            className={inputBase}
          />
        </Field>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DeedsBranch({ register, errors, t, lang }: any) {
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("deed_q_type")}
        options={DEED_TYPES}
        name="deedType"
        register={register}
        error={tErr(errors.deedType?.message, t)}
        lang={lang}
      />
      <RadioGroup
        legend={t("deed_q_reason")}
        options={DEED_REASONS}
        name="deedReason"
        register={register}
        error={tErr(errors.deedReason?.message, t)}
        lang={lang}
      />
      <Select
        id="deedCounty"
        label={t("deed_q_county")}
        options={COUNTIES}
        register={register}
        name="deedCounty"
        error={tErr(errors.deedCounty?.message, t)}
        lang={lang}
      />
      <Field
        id="deedPropertyCount"
        label={t("deed_q_count")}
        error={tErr(errors.deedPropertyCount?.message, t)}
      >
        <input
          id="deedPropertyCount"
          type="number"
          min={1}
          {...register("deedPropertyCount")}
          className={inputBase}
        />
      </Field>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Review summary
// ---------------------------------------------------------------------------

function ReviewSummary({
  data,
  t,
  lang,
}: {
  data: Partial<IntakeData>;
  t: (key: TranslationKey) => string;
  lang: Language;
}) {
  // Localize a stored option value (English) for display.
  const opt = (v: string | undefined) =>
    v ? optionLabel(v, lang) : undefined;
  const optList = (arr: string[] | undefined) =>
    arr && arr.length > 0 ? arr.map((v) => optionLabel(v, lang)).join(", ") : undefined;
  const serviceName = (v: string | undefined) =>
    v ? SERVICE_NAME_TRANSLATIONS[v]?.[lang] ?? v : undefined;
  const servicesList = (arr: string[] | undefined) =>
    arr && arr.length > 0
      ? arr.map((v) => SERVICE_NAME_TRANSLATIONS[v]?.[lang] ?? v).join(", ")
      : undefined;

  const rows: Array<[string, string | undefined]> = [
    [t("rs_name"), [data.firstName, data.lastName].filter(Boolean).join(" ")],
    [t("rs_phone"), data.phone],
    [t("rs_email"), data.email],
    [t("rs_preferred_contact"), opt(data.contactMethod)],
    [
      t("rs_best_time"),
      data.bestTime === "LateAfternoon"
        ? t("rs_late_afternoon_display")
        : opt(data.bestTime),
    ],
    [t("rs_primary_service"), serviceName(data.primaryService)],
    [
      t("rs_additional_services"),
      data.needsMoreServices === "Yes"
        ? servicesList(data.additionalServices)
        : undefined,
    ],

    // Divorce
    [t("rs_divorce_type"), opt(data.divorceType)],
    [t("rs_minor_children"), opt(data.divorceHasChildren)],
    [t("rs_children_count"), data.divorceChildrenCount],
    [t("rs_children_ages"), data.divorceChildrenAges],
    [t("rs_real_property"), opt(data.divorceHasProperty)],
    [t("rs_significant_assets"), opt(data.divorceHasAssets)],
    [t("rs_marriage_length"), opt(data.divorceMarriageLength)],
    [t("rs_filing_county"), opt(data.divorceFilingCounty)],
    [t("rs_already_filed"), opt(data.divorceFiledPaperwork)],

    // Eviction
    [t("rs_party"), opt(data.evictionParty)],
    [t("rs_property_type"), opt(data.evictionPropertyType)],
    [t("rs_eviction_reason"), opt(data.evictionReason)],
    [t("rs_notice_served"), opt(data.evictionNoticeServed)],
    [t("rs_notice_type"), opt(data.evictionNoticeType)],
    [t("rs_notice_date"), data.evictionNoticeDate],
    [t("rs_property_county"), opt(data.evictionCounty)],
    [t("rs_tenant_vacated"), opt(data.evictionTenantVacated)],
    [t("rs_monthly_rent"), opt(data.evictionRent)],

    // Trust
    [t("rs_trust_for"), opt(data.trustType)],
    [t("rs_minor_beneficiaries"), opt(data.trustHasMinors)],
    [t("rs_owns_real_property"), opt(data.trustOwnsProperty)],
    [t("rs_property_count"), data.trustPropertyCount],
    [t("rs_significant_assets"), opt(data.trustHasAssets)],
    [t("rs_existing_estate_docs"), opt(data.trustExistingDocs)],
    [t("rs_successor_trustee"), opt(data.trustSuccessor)],

    // POA
    [t("rs_poa_types"), optList(data.poaTypes)],
    [t("rs_poa_agent"), opt(data.poaAgent)],
    [
      t("rs_poa_reason"),
      data.poaHasReason === "Yes"
        ? data.poaReason || optionLabel("Yes", lang)
        : opt(data.poaHasReason),
    ],
    [t("rs_notarize"), opt(data.poaNotarize)],

    // DMV
    [t("rs_dmv_forms"), optList(data.dmvFormTypes)],
    [
      t("rs_dmv_appointment"),
      data.dmvHasAppointment === "Yes"
        ? data.dmvAppointmentDate || optionLabel("Yes", lang)
        : opt(data.dmvHasAppointment),
    ],
    [t("rs_dmv_details"), data.dmvDetails],

    // Tax
    [t("rs_tax_assistance"), optList(data.taxTypes)],
    [t("rs_tax_year"), opt(data.taxYear)],
    [
      t("rs_tax_deadline"),
      data.taxHasDeadline === "Yes"
        ? data.taxDeadlineDate || optionLabel("Yes", lang)
        : opt(data.taxHasDeadline),
    ],
    [t("rs_tax_notes"), data.taxNotes],

    // Wills & Health Care Directives
    [t("rs_wills_for"), opt(data.willsFor)],
    [t("rs_wills_documents"), opt(data.willsDocuments)],
    [t("rs_owns_real_property"), opt(data.willsOwnsProperty)],
    [t("rs_minor_children"), opt(data.willsHasMinors)],
    [t("rs_existing_will"), opt(data.willsExistingDocs)],

    // Probate
    [t("rs_probate_relation"), opt(data.probateRelation)],
    [t("rs_probate_will"), opt(data.probateHasWill)],
    [t("rs_owns_real_property"), opt(data.probateHasRealEstate)],
    [t("rs_estate_value"), opt(data.probateEstateValue)],
    [t("rs_filing_county"), opt(data.probateCounty)],
    [
      t("rs_deadline"),
      data.probateHasDeadline === "Yes"
        ? data.probateDeadlineDate || optionLabel("Yes", lang)
        : opt(data.probateHasDeadline),
    ],

    // Name change
    [t("rs_name_change_for"), opt(data.nameChangeFor)],
    [t("rs_name_change_reason"), opt(data.nameChangeReason)],
    [t("rs_filing_county"), opt(data.nameChangeCounty)],
    [
      t("rs_court_date"),
      data.nameChangeHasCourtDate === "Yes"
        ? data.nameChangeCourtDate || optionLabel("Yes", lang)
        : opt(data.nameChangeHasCourtDate),
    ],

    // Small claims
    [t("rs_small_claims_role"), opt(data.smallClaimsRole)],
    [t("rs_claim_amount"), opt(data.smallClaimsAmount)],
    [t("rs_filing_county"), opt(data.smallClaimsCounty)],
    [
      t("rs_hearing_date"),
      data.smallClaimsHasHearing === "Yes"
        ? data.smallClaimsHearingDate || optionLabel("Yes", lang)
        : opt(data.smallClaimsHasHearing),
    ],
    [t("rs_description"), data.smallClaimsDescription],

    // Guardianship
    [t("rs_guardianship_type"), opt(data.guardianshipType)],
    [t("rs_guardianship_relation"), opt(data.guardianshipRelation)],
    [t("rs_filing_county"), opt(data.guardianshipCounty)],
    [
      t("rs_court_date"),
      data.guardianshipHasCourtDate === "Yes"
        ? data.guardianshipCourtDate || optionLabel("Yes", lang)
        : opt(data.guardianshipHasCourtDate),
    ],

    // Deeds
    [t("rs_deed_type"), opt(data.deedType)],
    [t("rs_deed_reason"), opt(data.deedReason)],
    [t("rs_property_county"), opt(data.deedCounty)],
    [t("rs_property_count"), data.deedPropertyCount],

    // Other
    [t("rs_description"), data.otherDescription],
    [
      t("rs_deadline"),
      data.otherHasDeadline === "Yes"
        ? data.otherDeadlineDate || optionLabel("Yes", lang)
        : opt(data.otherHasDeadline),
    ],

    // General
    [t("rs_your_county"), opt(data.clientCounty)],
    [t("rs_heard_via"), opt(data.referralSource)],
    [t("rs_referred_by"), data.referralName],
    [t("rs_additional_notes"), data.additionalNotes],
  ];

  return (
    <dl className="border border-[var(--color-border-light)] rounded-sm divide-y divide-[var(--color-border-light)]">
      {rows
        .filter(([, v]) => v && v.length > 0)
        .map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-4 py-3 text-sm"
          >
            <dt className="text-[var(--color-navy)] opacity-70 font-medium">
              {label}
            </dt>
            <dd className="sm:col-span-2 text-[var(--color-body-dark)] break-words">
              {value}
            </dd>
          </div>
        ))}
    </dl>
  );
}

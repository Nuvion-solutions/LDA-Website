"use client";

import { useState } from "react";
import Link from "next/link";
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
import { useLanguage } from "@/lib/language-context";
import {
  SERVICE_NAME_TRANSLATIONS,
  optionLabel,
  type Language,
  type TranslationKey,
} from "@/lib/translations";

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const PRIMARY_SERVICES = [
  "Divorce & Family Law Documents",
  "Eviction (Unlawful Detainer) Paperwork",
  "Immigration Documents",
  "Living Trust Documents",
  "Power of Attorney",
  "DMV Form Assistance",
  "Tax Document Organization (Clerical)",
  "Other / Not Sure",
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

const IMMIGRATION_FORM_OPTIONS = [
  "I-130 (Petition for Alien Relative)",
  "I-485 (Adjustment of Status)",
  "N-400 (Naturalization Application)",
  "I-131 (Travel Document/Advance Parole)",
  "I-765 (Employment Authorization)",
  "DACA Renewal",
  "I-751 (Remove Conditions on Residence)",
  "Other / Not Sure",
] as const;

const IMMIGRATION_STATUSES = [
  "US Citizen",
  "Lawful Permanent Resident",
  "DACA",
  "Pending",
  "Visa holder",
  "Other",
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
    firstName: z.string().min(1, "First name is required").max(100),
    lastName: z.string().min(1, "Last name is required").max(100),
    phone: z
      .string()
      .min(7, "Please enter a valid phone number")
      .max(30, "Phone number is too long"),
    email: z.string().email("Please enter a valid email address"),
    contactMethod: requiredEnum(
      ["Phone", "Email", "Text"],
      "Please choose how to reach you",
    ),
    bestTime: requiredEnum(
      ["Morning", "Afternoon", "LateAfternoon"],
      "Please choose the best time",
    ),

    // Step 2
    primaryService: requiredEnum(PRIMARY_SERVICES, "Please choose a service"),
    needsMoreServices: requiredEnum(
      ["Yes", "No"],
      "Please answer Yes or No",
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

    // Step 3 — Immigration
    immigrationForms: z.array(z.string()).optional(),
    immigrationFormsOther: optStr,
    immigrationForWhom: z
      .enum(["Myself", "Family member", "Both"])
      .optional(),
    immigrationStatus: z.enum(IMMIGRATION_STATUSES).optional(),
    immigrationHasDeadline: z.enum(["Yes", "No"]).optional(),
    immigrationDeadlineDate: optDate,
    immigrationPreviouslyFiled: z.enum(["Yes", "No", "Not sure"]).optional(),

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

    // Step 3 — Other
    otherDescription: optStr,
    otherHasDeadline: z.enum(["Yes", "No"]).optional(),
    otherDeadlineDate: optDate,

    // Step 4
    clientCounty: requiredEnum(COUNTIES, "Please choose a county"),
    referralSource: requiredEnum(
      REFERRAL_SOURCES,
      "Please choose how you heard about us",
    ),
    referralName: optStr,
    additionalNotes: z.string().max(4000).optional().or(z.literal("")),

    // Step 5
    consentLDA: z.literal(true, {
      message: "You must acknowledge this to continue",
    }),
    consentContact: z.literal(true, {
      message: "You must consent to be contacted",
    }),
  })
  .superRefine((data, ctx) => {
    const need = (path: string, value: unknown, msg = "Required") => {
      const empty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);
      if (empty) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [path],
          message: msg,
        });
      }
    };

    // If "needs more services" = Yes, additionalServices must have at least one
    if (data.needsMoreServices === "Yes") {
      if (!data.additionalServices || data.additionalServices.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["additionalServices"],
          message: "Select at least one additional service",
        });
      }
    }

    switch (data.primaryService) {
      case "Divorce & Family Law Documents": {
        need("divorceType", data.divorceType);
        need("divorceHasChildren", data.divorceHasChildren);
        if (data.divorceHasChildren === "Yes") {
          need("divorceChildrenCount", data.divorceChildrenCount);
          need("divorceChildrenAges", data.divorceChildrenAges);
        }
        need("divorceHasProperty", data.divorceHasProperty);
        need("divorceHasAssets", data.divorceHasAssets);
        need("divorceMarriageLength", data.divorceMarriageLength);
        need("divorceFilingCounty", data.divorceFilingCounty);
        need("divorceFiledPaperwork", data.divorceFiledPaperwork);
        break;
      }
      case "Eviction (Unlawful Detainer) Paperwork": {
        need("evictionParty", data.evictionParty);
        need("evictionPropertyType", data.evictionPropertyType);
        need("evictionReason", data.evictionReason);
        need("evictionNoticeServed", data.evictionNoticeServed);
        if (data.evictionNoticeServed === "Yes") {
          need("evictionNoticeType", data.evictionNoticeType);
          need("evictionNoticeDate", data.evictionNoticeDate);
        }
        need("evictionCounty", data.evictionCounty);
        need("evictionTenantVacated", data.evictionTenantVacated);
        need("evictionRent", data.evictionRent);
        break;
      }
      case "Immigration Documents": {
        if (!data.immigrationForms || data.immigrationForms.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["immigrationForms"],
            message: "Select at least one form",
          });
        }
        need("immigrationForWhom", data.immigrationForWhom);
        need("immigrationStatus", data.immigrationStatus);
        need("immigrationHasDeadline", data.immigrationHasDeadline);
        if (data.immigrationHasDeadline === "Yes") {
          need("immigrationDeadlineDate", data.immigrationDeadlineDate);
        }
        need("immigrationPreviouslyFiled", data.immigrationPreviouslyFiled);
        break;
      }
      case "Living Trust Documents": {
        need("trustType", data.trustType);
        need("trustHasMinors", data.trustHasMinors);
        need("trustOwnsProperty", data.trustOwnsProperty);
        if (data.trustOwnsProperty === "Yes") {
          need("trustPropertyCount", data.trustPropertyCount);
        }
        need("trustHasAssets", data.trustHasAssets);
        need("trustExistingDocs", data.trustExistingDocs);
        need("trustSuccessor", data.trustSuccessor);
        break;
      }
      case "Power of Attorney": {
        if (!data.poaTypes || data.poaTypes.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["poaTypes"],
            message: "Select at least one type",
          });
        }
        need("poaAgent", data.poaAgent);
        need("poaHasReason", data.poaHasReason);
        if (data.poaHasReason === "Yes") {
          need("poaReason", data.poaReason);
        }
        need("poaNotarize", data.poaNotarize);
        break;
      }
      case "DMV Form Assistance": {
        if (!data.dmvFormTypes || data.dmvFormTypes.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["dmvFormTypes"],
            message: "Select at least one form",
          });
        }
        need("dmvHasAppointment", data.dmvHasAppointment);
        if (data.dmvHasAppointment === "Yes") {
          need("dmvAppointmentDate", data.dmvAppointmentDate);
        }
        break;
      }
      case "Tax Document Organization (Clerical)": {
        if (!data.taxTypes || data.taxTypes.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["taxTypes"],
            message: "Select at least one option",
          });
        }
        need("taxYear", data.taxYear);
        need("taxHasDeadline", data.taxHasDeadline);
        if (data.taxHasDeadline === "Yes") {
          need("taxDeadlineDate", data.taxDeadlineDate);
        }
        break;
      }
      case "Other / Not Sure": {
        need(
          "otherDescription",
          data.otherDescription,
          "Please describe what you need",
        );
        need("otherHasDeadline", data.otherHasDeadline);
        if (data.otherHasDeadline === "Yes") {
          need("otherDeadlineDate", data.otherDeadlineDate);
        }
        break;
      }
    }

    // Referral name conditional
    if (data.referralSource === "Referral") {
      need("referralName", data.referralName, "Please tell us who referred you");
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
    case "Immigration Documents":
      return [
        "immigrationForms",
        "immigrationFormsOther",
        "immigrationForWhom",
        "immigrationStatus",
        "immigrationHasDeadline",
        "immigrationDeadlineDate",
        "immigrationPreviouslyFiled",
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
    case "Other / Not Sure":
      return ["otherDescription", "otherHasDeadline", "otherDeadlineDate"];
    default:
      return [];
  }
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
      immigrationForms: [],
      immigrationFormsOther: "",
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
      immigrationDeadlineDate: "",
      dmvAppointmentDate: "",
      taxDeadlineDate: "",
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
    immigrationHasDeadline: watch("immigrationHasDeadline"),
    immigrationDeadlineDate: watch("immigrationDeadlineDate"),
    dmvHasAppointment: watch("dmvHasAppointment"),
    dmvAppointmentDate: watch("dmvAppointmentDate"),
    taxHasDeadline: watch("taxHasDeadline"),
    taxDeadlineDate: watch("taxDeadlineDate"),
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
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: IntakeData) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
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
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="text-[var(--color-navy)] font-medium underline decoration-[var(--color-gold)] underline-offset-4"
            >
              {BUSINESS.phone}
            </a>{" "}
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  error={errors.firstName?.message}
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
                  error={errors.lastName?.message}
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
                  error={errors.phone?.message}
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
                  error={errors.email?.message}
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
                  <p className={errorBase}>{errors.contactMethod.message}</p>
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
                  <p className={errorBase}>{errors.bestTime.message}</p>
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
                  <p className={errorBase}>{errors.primaryService.message}</p>
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
                  <p className={errorBase}>{errors.needsMoreServices.message}</p>
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
                      {errors.additionalServices.message as string}
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
                  <p className={errorBase}>{errors.clientCounty.message}</p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="referralSource" className={labelBase}>
                  {t("intake_f_referral_source")} <Req />
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
                  <p className={errorBase}>{errors.referralSource.message}</p>
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
                    <p className={errorBase}>{errors.referralName.message}</p>
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

              <ReviewSummary data={getValues()} t={t} lang={lang} />

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
                  <a
                    href={`tel:${BUSINESS.phoneTel}`}
                    className="font-medium underline underline-offset-2"
                  >
                    {BUSINESS.phone}
                  </a>{" "}
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
          <a
            href={`tel:${BUSINESS.phoneTel}`}
            className="font-semibold underline underline-offset-2"
          >
            {BUSINESS.phone}
          </a>{" "}
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
    case "Immigration Documents":
      return (
        <ImmigrationBranch
          register={register}
          control={control}
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
        required
        options={["Uncontested", "Contested", "Not sure yet"]}
        name="divorceType"
        register={register}
        error={errors.divorceType?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("div_q_children")}
        required
        options={["Yes", "No"]}
        name="divorceHasChildren"
        register={register}
        error={errors.divorceHasChildren?.message}
        lang={lang}
      />
      {hasChildren === "Yes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            id="divorceChildrenCount"
            label={t("div_q_children_count")}
            required
            error={errors.divorceChildrenCount?.message}
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
            required
            error={errors.divorceChildrenAges?.message}
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
        required
        options={["Yes", "No", "Not sure"]}
        name="divorceHasProperty"
        register={register}
        error={errors.divorceHasProperty?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("div_q_assets")}
        required
        options={["Yes", "No", "Not sure"]}
        name="divorceHasAssets"
        register={register}
        error={errors.divorceHasAssets?.message}
        lang={lang}
      />
      <Select
        id="divorceMarriageLength"
        label={t("div_q_marriage_length")}
        required
        options={MARRIAGE_LENGTHS}
        register={register}
        name="divorceMarriageLength"
        placeholder={t("div_q_marriage_placeholder")}
        error={errors.divorceMarriageLength?.message}
        lang={lang}
      />
      <Select
        id="divorceFilingCounty"
        label={t("div_q_filing_county")}
        required
        options={COUNTIES}
        register={register}
        name="divorceFilingCounty"
        placeholder={t("div_q_filing_county_placeholder")}
        error={errors.divorceFilingCounty?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("div_q_filed_paperwork")}
        required
        options={["Yes", "No"]}
        name="divorceFiledPaperwork"
        register={register}
        error={errors.divorceFiledPaperwork?.message}
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
        required
        options={["Landlord", "Tenant"]}
        name="evictionParty"
        register={register}
        error={errors.evictionParty?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("evi_q_property_type")}
        required
        options={["Residential", "Commercial"]}
        name="evictionPropertyType"
        register={register}
        error={errors.evictionPropertyType?.message}
        lang={lang}
      />
      <Select
        id="evictionReason"
        label={t("evi_q_reason")}
        required
        options={EVICTION_REASONS}
        register={register}
        name="evictionReason"
        placeholder={t("evi_q_reason_placeholder")}
        error={errors.evictionReason?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("evi_q_notice_served")}
        required
        options={["Yes", "No"]}
        name="evictionNoticeServed"
        register={register}
        error={errors.evictionNoticeServed?.message}
        lang={lang}
      />
      {noticeServed === "Yes" && (
        <>
          <Select
            id="evictionNoticeType"
            label={t("evi_q_notice_type")}
            required
            options={NOTICE_TYPES}
            register={register}
            name="evictionNoticeType"
            placeholder={t("evi_q_notice_type_placeholder")}
            error={errors.evictionNoticeType?.message}
            lang={lang}
          />
          <Field
            id="evictionNoticeDate"
            label={t("evi_q_notice_date")}
            required
            error={errors.evictionNoticeDate?.message}
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
        required
        options={COUNTIES}
        register={register}
        name="evictionCounty"
        placeholder={t("evi_q_county_placeholder")}
        error={errors.evictionCounty?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("evi_q_tenant_vacated")}
        required
        options={["Yes", "No", "Partially"]}
        name="evictionTenantVacated"
        register={register}
        error={errors.evictionTenantVacated?.message}
        lang={lang}
      />
      <Select
        id="evictionRent"
        label={t("evi_q_rent")}
        required
        options={RENT_RANGES}
        register={register}
        name="evictionRent"
        placeholder={t("evi_q_rent_placeholder")}
        error={errors.evictionRent?.message}
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
function ImmigrationBranch({ register, control, watch, errors, t, lang }: any) {
  const hasDeadline = watch("immigrationHasDeadline");
  const forms: string[] = watch("immigrationForms") ?? [];
  const showOther = forms.includes("Other / Not Sure");
  return (
    <div className="space-y-6">
      <CheckboxGrid
        legend={t("imm_q_forms")}
        required
        options={IMMIGRATION_FORM_OPTIONS}
        name="immigrationForms"
        control={control}
        error={errors.immigrationForms?.message as string | undefined}
        lang={lang}
      />
      {showOther && (
        <Field
          id="immigrationFormsOther"
          label={t("imm_q_forms_other")}
          error={errors.immigrationFormsOther?.message}
        >
          <textarea
            id="immigrationFormsOther"
            rows={3}
            {...register("immigrationFormsOther")}
            className={inputBase}
          />
        </Field>
      )}
      <RadioGroup
        legend={t("imm_q_for_whom")}
        required
        options={["Myself", "Family member", "Both"]}
        name="immigrationForWhom"
        register={register}
        error={errors.immigrationForWhom?.message}
        lang={lang}
      />
      <Select
        id="immigrationStatus"
        label={t("imm_q_status")}
        required
        options={IMMIGRATION_STATUSES}
        register={register}
        name="immigrationStatus"
        placeholder={t("imm_q_status_placeholder")}
        error={errors.immigrationStatus?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("imm_q_deadline")}
        required
        options={["Yes", "No"]}
        name="immigrationHasDeadline"
        register={register}
        error={errors.immigrationHasDeadline?.message}
        lang={lang}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="immigrationDeadlineDate"
          label={t("imm_q_deadline_date")}
          required
          error={errors.immigrationDeadlineDate?.message}
        >
          <input
            id="immigrationDeadlineDate"
            type="date"
            {...register("immigrationDeadlineDate")}
            className={inputBase}
          />
        </Field>
      )}
      <RadioGroup
        legend={t("imm_q_previously_filed")}
        required
        options={["Yes", "No", "Not sure"]}
        name="immigrationPreviouslyFiled"
        register={register}
        error={errors.immigrationPreviouslyFiled?.message}
        lang={lang}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TrustBranch({ register, watch, errors, t, lang }: any) {
  const ownsProperty = watch("trustOwnsProperty");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend={t("trust_q_type")}
        required
        options={["Individual", "Married couple"]}
        name="trustType"
        register={register}
        error={errors.trustType?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("trust_q_minors")}
        required
        options={["Yes", "No"]}
        name="trustHasMinors"
        register={register}
        error={errors.trustHasMinors?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("trust_q_property")}
        required
        options={["Yes", "No"]}
        name="trustOwnsProperty"
        register={register}
        error={errors.trustOwnsProperty?.message}
        lang={lang}
      />
      {ownsProperty === "Yes" && (
        <Field
          id="trustPropertyCount"
          label={t("trust_q_property_count")}
          required
          error={errors.trustPropertyCount?.message}
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
        required
        options={["Yes", "No", "Not sure"]}
        name="trustHasAssets"
        register={register}
        error={errors.trustHasAssets?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("trust_q_existing")}
        required
        options={["Yes", "No", "Not sure"]}
        name="trustExistingDocs"
        register={register}
        error={errors.trustExistingDocs?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("trust_q_successor")}
        required
        options={TRUST_SUCCESSOR_OPTIONS}
        name="trustSuccessor"
        register={register}
        error={errors.trustSuccessor?.message}
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
        required
        options={POA_TYPES}
        name="poaTypes"
        control={control}
        error={errors.poaTypes?.message as string | undefined}
        lang={lang}
      />
      <RadioGroup
        legend={t("poa_q_agent")}
        required
        options={AGENT_OPTIONS}
        name="poaAgent"
        register={register}
        error={errors.poaAgent?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("poa_q_reason_yn")}
        required
        options={["Yes", "No"]}
        name="poaHasReason"
        register={register}
        error={errors.poaHasReason?.message}
        lang={lang}
      />
      {hasReason === "Yes" && (
        <Field
          id="poaReason"
          label={t("poa_q_reason")}
          required
          error={errors.poaReason?.message}
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
        required
        options={["Yes", "No", "Not sure"]}
        name="poaNotarize"
        register={register}
        error={errors.poaNotarize?.message}
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
        required
        options={DMV_FORM_OPTIONS}
        name="dmvFormTypes"
        control={control}
        error={errors.dmvFormTypes?.message as string | undefined}
        lang={lang}
      />
      <RadioGroup
        legend={t("dmv_q_appointment")}
        required
        options={["Yes", "No"]}
        name="dmvHasAppointment"
        register={register}
        error={errors.dmvHasAppointment?.message}
        lang={lang}
      />
      {hasAppt === "Yes" && (
        <Field
          id="dmvAppointmentDate"
          label={t("dmv_q_appointment_date")}
          required
          error={errors.dmvAppointmentDate?.message}
        >
          <input
            id="dmvAppointmentDate"
            type="date"
            {...register("dmvAppointmentDate")}
            className={inputBase}
          />
        </Field>
      )}
      <Field
        id="dmvDetails"
        label={t("dmv_q_details")}
        error={errors.dmvDetails?.message}
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
        required
        options={TAX_TYPE_OPTIONS}
        name="taxTypes"
        control={control}
        error={errors.taxTypes?.message as string | undefined}
        lang={lang}
      />
      <Select
        id="taxYear"
        label={t("tax_q_year")}
        required
        options={TAX_YEARS}
        register={register}
        name="taxYear"
        placeholder={t("tax_q_year_placeholder")}
        error={errors.taxYear?.message}
        lang={lang}
      />
      <RadioGroup
        legend={t("tax_q_deadline")}
        required
        options={["Yes", "No"]}
        name="taxHasDeadline"
        register={register}
        error={errors.taxHasDeadline?.message}
        lang={lang}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="taxDeadlineDate"
          label={t("tax_q_deadline_date")}
          required
          error={errors.taxDeadlineDate?.message}
        >
          <input
            id="taxDeadlineDate"
            type="date"
            {...register("taxDeadlineDate")}
            className={inputBase}
          />
        </Field>
      )}
      <Field
        id="taxNotes"
        label={t("tax_q_notes")}
        error={errors.taxNotes?.message}
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
        required
        error={errors.otherDescription?.message}
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
        required
        options={["Yes", "No"]}
        name="otherHasDeadline"
        register={register}
        error={errors.otherHasDeadline?.message}
        lang={lang}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="otherDeadlineDate"
          label={t("other_q_deadline_date")}
          required
          error={errors.otherDeadlineDate?.message}
        >
          <input
            id="otherDeadlineDate"
            type="date"
            {...register("otherDeadlineDate")}
            className={inputBase}
          />
        </Field>
      )}
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

    // Immigration
    [t("rs_immigration_forms"), optList(data.immigrationForms)],
    [t("rs_other_forms_detail"), data.immigrationFormsOther],
    [t("rs_application_for"), opt(data.immigrationForWhom)],
    [t("rs_immigration_status"), opt(data.immigrationStatus)],
    [
      t("rs_deadline"),
      data.immigrationHasDeadline === "Yes"
        ? data.immigrationDeadlineDate || optionLabel("Yes", lang)
        : opt(data.immigrationHasDeadline),
    ],
    [t("rs_previously_filed"), opt(data.immigrationPreviouslyFiled)],

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

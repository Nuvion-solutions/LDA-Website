"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import type { Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { BUSINESS } from "@/lib/utils";

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
  const [submitted, setSubmitted] = useState<{ firstName: string } | null>(
    null,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    getValues,
    formState: { errors },
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
      setSubmitted({ firstName: data.firstName });
    } catch {
      setSubmitError("network");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[var(--color-border-light)] rounded-sm p-8 md:p-12 text-center"
      >
        <div className="mx-auto w-20 h-20 rounded-full bg-[var(--color-gold)] flex items-center justify-center mb-6">
          <Check
            className="h-10 w-10 text-[var(--color-navy)]"
            aria-hidden
            strokeWidth={2.5}
          />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-navy)] mb-4">
          Thank you, {submitted.firstName}. Your intake has been received.
        </h2>
        <p className="text-[var(--color-body-dark)] text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          A member of our team will review your request and follow up within 1
          business day with pricing, next steps, and any additional information
          needed.
        </p>
        <p className="text-[var(--color-body-dark)] opacity-80">
          Questions in the meantime? Call us at{" "}
          <a
            href={`tel:${BUSINESS.phoneTel}`}
            className="text-[var(--color-navy)] font-medium underline decoration-[var(--color-gold)] underline-offset-4"
          >
            {BUSINESS.phone}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-[var(--color-navy)] font-medium underline decoration-[var(--color-gold)] underline-offset-4 break-all"
          >
            {BUSINESS.email}
          </a>
          .
        </p>
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
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
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
                title="Contact Information"
                subtitle="How can we reach you?"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  id="firstName"
                  label="First Name"
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
                  label="Last Name"
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
                  label="Phone Number"
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
                  label="Email Address"
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

              <RadioGroup
                legend="Best way to contact you"
                required
                error={errors.contactMethod?.message}
                options={["Phone", "Email", "Text"]}
                name="contactMethod"
                register={register}
                className="mt-7"
              />

              <div className="mt-7">
                <label htmlFor="bestTime" className={labelBase}>
                  Best time to reach you <Req />
                </label>
                <select
                  id="bestTime"
                  {...register("bestTime")}
                  className={inputBase}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a time…
                  </option>
                  <option value="Morning">Morning (9am – 12pm)</option>
                  <option value="Afternoon">Afternoon (12pm – 3pm)</option>
                  <option value="LateAfternoon">
                    Late Afternoon (3pm – 5pm)
                  </option>
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
                title="Service Selection"
                subtitle="What type of document(s) do you need prepared?"
              />

              <fieldset>
                <legend className={labelBase}>
                  Primary service <Req />
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
                      <span className="text-sm">{svc}</span>
                    </label>
                  ))}
                </div>
                {errors.primaryService && (
                  <p className={errorBase}>{errors.primaryService.message}</p>
                )}
              </fieldset>

              <RadioGroup
                legend="Do you need help with more than one of the above?"
                required
                error={errors.needsMoreServices?.message}
                options={["Yes", "No"]}
                name="needsMoreServices"
                register={register}
                className="mt-6"
              />

              {needsMoreServices === "Yes" && (
                <fieldset className="mt-6">
                  <legend className={labelBase}>
                    Additional services <Req />
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
                              <span className="text-sm">{svc}</span>
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
                title="Service Details"
                subtitle="A few specifics so we can quote and prepare accurately."
              />
              <BranchFields
                service={primaryService}
                register={register}
                control={control}
                watch={watch}
                errors={errors}
              />
            </StepWrap>
          )}

          {step === 3 && (
            <StepWrap key="step-3">
              <StepHeader
                title="General Information"
                subtitle="A few last details to round out your intake."
              />

              <div>
                <label htmlFor="clientCounty" className={labelBase}>
                  What county are you located in? <Req />
                </label>
                <select
                  id="clientCounty"
                  {...register("clientCounty")}
                  className={inputBase}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a county…
                  </option>
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.clientCounty && (
                  <p className={errorBase}>{errors.clientCounty.message}</p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="referralSource" className={labelBase}>
                  How did you hear about us? <Req />
                </label>
                <select
                  id="referralSource"
                  {...register("referralSource")}
                  className={inputBase}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a source…
                  </option>
                  {REFERRAL_SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
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
                    Who referred you? <Req />
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
                  Is there anything else you&apos;d like us to know?
                </label>
                <textarea
                  id="additionalNotes"
                  rows={5}
                  {...register("additionalNotes")}
                  className={inputBase}
                  placeholder="Optional — share any background that will help us serve you."
                />
              </div>
            </StepWrap>
          )}

          {step === 4 && (
            <StepWrap key="step-4">
              <StepHeader
                title="Review & Confirm"
                subtitle="Quick review of what you've told us, then two acknowledgments before you submit."
              />

              <ReviewSummary data={getValues()} />

              <div className="mt-8 space-y-4">
                <label className="flex items-start gap-3 p-4 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5">
                  <input
                    type="checkbox"
                    {...register("consentLDA")}
                    className="accent-[var(--color-gold)] h-4 w-4 mt-1 shrink-0"
                  />
                  <span className="text-sm text-[var(--color-body-dark)] leading-relaxed">
                    I understand that {BUSINESS.name} is not a law firm and does
                    not provide legal advice or legal representation. I am
                    directing the preparation of my own documents. <Req />
                  </span>
                </label>
                {errors.consentLDA && (
                  <p className={errorBase}>{errors.consentLDA.message}</p>
                )}

                <label className="flex items-start gap-3 p-4 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5">
                  <input
                    type="checkbox"
                    {...register("consentContact")}
                    className="accent-[var(--color-gold)] h-4 w-4 mt-1 shrink-0"
                  />
                  <span className="text-sm text-[var(--color-body-dark)] leading-relaxed">
                    I consent to be contacted by phone, email, or text regarding
                    my inquiry. <Req />
                  </span>
                </label>
                {errors.consentContact && (
                  <p className={errorBase}>{errors.consentContact.message}</p>
                )}
              </div>

              {submitError && (
                <div className="mt-6 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-900">
                  We couldn&apos;t submit your intake automatically. Please call
                  us at{" "}
                  <a
                    href={`tel:${BUSINESS.phoneTel}`}
                    className="font-medium underline underline-offset-2"
                  >
                    {BUSINESS.phone}
                  </a>{" "}
                  or email{" "}
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="font-medium underline underline-offset-2 break-all"
                  >
                    {BUSINESS.email}
                  </a>{" "}
                  and we&apos;ll take it from there.
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
            Back to home
          </Link>
        ) : (
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-3 text-[var(--color-navy)] hover:text-[var(--color-gold)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 bg-[var(--color-navy)] hover:bg-[var(--color-navy-mid)] text-white px-6 py-3 rounded-sm text-sm font-medium tracking-wide transition-colors"
          >
            Continue
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
                Submitting…
              </>
            ) : (
              "Submit Intake Request"
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
}: {
  legend: string;
  options: readonly string[];
  name: FieldName;
  register: RegisterFn;
  required?: boolean;
  error?: string;
  className?: string;
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
            <span className="text-sm">{opt}</span>
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
  placeholder = "Select…",
  className,
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
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
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
};

function BranchFields({
  service,
  register,
  control,
  watch,
  errors,
}: BranchProps) {
  if (!service) {
    return (
      <p className="text-sm text-[var(--color-body-dark)] opacity-70">
        Please select a service on the previous step.
      </p>
    );
  }

  switch (service) {
    case "Divorce & Family Law Documents":
      return (
        <DivorceBranch register={register} watch={watch} errors={errors} />
      );
    case "Eviction (Unlawful Detainer) Paperwork":
      return (
        <EvictionBranch register={register} watch={watch} errors={errors} />
      );
    case "Immigration Documents":
      return (
        <ImmigrationBranch
          register={register}
          control={control}
          watch={watch}
          errors={errors}
        />
      );
    case "Living Trust Documents":
      return (
        <TrustBranch register={register} watch={watch} errors={errors} />
      );
    case "Power of Attorney":
      return (
        <PoaBranch
          register={register}
          control={control}
          watch={watch}
          errors={errors}
        />
      );
    case "DMV Form Assistance":
      return (
        <DmvBranch
          register={register}
          control={control}
          watch={watch}
          errors={errors}
        />
      );
    case "Tax Document Organization (Clerical)":
      return (
        <TaxBranch
          register={register}
          control={control}
          watch={watch}
          errors={errors}
        />
      );
    case "Other / Not Sure":
      return (
        <OtherBranch register={register} watch={watch} errors={errors} />
      );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DivorceBranch({ register, watch, errors }: any) {
  const hasChildren = watch("divorceHasChildren");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend="Is this a joint/uncontested divorce or is the other party contesting?"
        required
        options={[
          "Uncontested",
          "Contested",
          "Not sure yet",
        ]}
        name="divorceType"
        register={register}
        error={errors.divorceType?.message}
      />
      <RadioGroup
        legend="Do you and your spouse have minor children together?"
        required
        options={["Yes", "No"]}
        name="divorceHasChildren"
        register={register}
        error={errors.divorceHasChildren?.message}
      />
      {hasChildren === "Yes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            id="divorceChildrenCount"
            label="How many children?"
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
            label="Ages of children"
            required
            error={errors.divorceChildrenAges?.message}
          >
            <input
              id="divorceChildrenAges"
              {...register("divorceChildrenAges")}
              className={inputBase}
              placeholder="e.g. 5, 8, 12"
            />
          </Field>
        </div>
      )}
      <RadioGroup
        legend="Do you own real property together (home, land)?"
        required
        options={["Yes", "No", "Not sure"]}
        name="divorceHasProperty"
        register={register}
        error={errors.divorceHasProperty?.message}
      />
      <RadioGroup
        legend="Do you have retirement accounts, pensions, or significant assets to divide?"
        required
        options={["Yes", "No", "Not sure"]}
        name="divorceHasAssets"
        register={register}
        error={errors.divorceHasAssets?.message}
      />
      <Select
        id="divorceMarriageLength"
        label="Approximately how long were you married?"
        required
        options={MARRIAGE_LENGTHS}
        register={register}
        name="divorceMarriageLength"
        placeholder="Select length…"
        error={errors.divorceMarriageLength?.message}
      />
      <Select
        id="divorceFilingCounty"
        label="What county will you be filing in?"
        required
        options={COUNTIES}
        register={register}
        name="divorceFilingCounty"
        placeholder="Select county…"
        error={errors.divorceFilingCounty?.message}
      />
      <RadioGroup
        legend="Have you already filed any paperwork with the court?"
        required
        options={["Yes", "No"]}
        name="divorceFiledPaperwork"
        register={register}
        error={errors.divorceFiledPaperwork?.message}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EvictionBranch({ register, watch, errors }: any) {
  const noticeServed = watch("evictionNoticeServed");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend="Are you the landlord or the tenant?"
        required
        options={["Landlord", "Tenant"]}
        name="evictionParty"
        register={register}
        error={errors.evictionParty?.message}
      />
      <RadioGroup
        legend="Is this a residential or commercial property?"
        required
        options={["Residential", "Commercial"]}
        name="evictionPropertyType"
        register={register}
        error={errors.evictionPropertyType?.message}
      />
      <Select
        id="evictionReason"
        label="What is the reason for the eviction?"
        required
        options={EVICTION_REASONS}
        register={register}
        name="evictionReason"
        placeholder="Select reason…"
        error={errors.evictionReason?.message}
      />
      <RadioGroup
        legend="Has a written notice already been served to the tenant?"
        required
        options={["Yes", "No"]}
        name="evictionNoticeServed"
        register={register}
        error={errors.evictionNoticeServed?.message}
      />
      {noticeServed === "Yes" && (
        <>
          <Select
            id="evictionNoticeType"
            label="What type of notice?"
            required
            options={NOTICE_TYPES}
            register={register}
            name="evictionNoticeType"
            placeholder="Select notice type…"
            error={errors.evictionNoticeType?.message}
          />
          <Field
            id="evictionNoticeDate"
            label="Date the notice was served"
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
        label="What county is the property located in?"
        required
        options={COUNTIES}
        register={register}
        name="evictionCounty"
        placeholder="Select county…"
        error={errors.evictionCounty?.message}
      />
      <RadioGroup
        legend="Has the tenant already vacated?"
        required
        options={["Yes", "No", "Partially"]}
        name="evictionTenantVacated"
        register={register}
        error={errors.evictionTenantVacated?.message}
      />
      <Select
        id="evictionRent"
        label="Approximate monthly rent amount"
        required
        options={RENT_RANGES}
        register={register}
        name="evictionRent"
        placeholder="Select range…"
        error={errors.evictionRent?.message}
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
}: {
  legend: string;
  options: readonly string[];
  name: FieldName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  required?: boolean;
  error?: string;
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
                  <span className="text-sm">{opt}</span>
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
function ImmigrationBranch({ register, control, watch, errors }: any) {
  const hasDeadline = watch("immigrationHasDeadline");
  const forms: string[] = watch("immigrationForms") ?? [];
  const showOther = forms.includes("Other / Not Sure");
  return (
    <div className="space-y-6">
      <CheckboxGrid
        legend="What type of immigration form do you need help preparing?"
        required
        options={IMMIGRATION_FORM_OPTIONS}
        name="immigrationForms"
        control={control}
        error={errors.immigrationForms?.message as string | undefined}
      />
      {showOther && (
        <Field
          id="immigrationFormsOther"
          label="Please describe which other form(s)"
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
        legend="Is this application for yourself or a family member?"
        required
        options={["Myself", "Family member", "Both"]}
        name="immigrationForWhom"
        register={register}
        error={errors.immigrationForWhom?.message}
      />
      <Select
        id="immigrationStatus"
        label="What is your current immigration status?"
        required
        options={IMMIGRATION_STATUSES}
        register={register}
        name="immigrationStatus"
        placeholder="Select status…"
        error={errors.immigrationStatus?.message}
      />
      <RadioGroup
        legend="Do you have a filing deadline or appointment date?"
        required
        options={["Yes", "No"]}
        name="immigrationHasDeadline"
        register={register}
        error={errors.immigrationHasDeadline?.message}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="immigrationDeadlineDate"
          label="What is the date?"
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
        legend="Have you previously filed any immigration forms?"
        required
        options={["Yes", "No", "Not sure"]}
        name="immigrationPreviouslyFiled"
        register={register}
        error={errors.immigrationPreviouslyFiled?.message}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TrustBranch({ register, watch, errors }: any) {
  const ownsProperty = watch("trustOwnsProperty");
  return (
    <div className="space-y-6">
      <RadioGroup
        legend="Is this trust for an individual or a couple?"
        required
        options={["Individual", "Married couple"]}
        name="trustType"
        register={register}
        error={errors.trustType?.message}
      />
      <RadioGroup
        legend="Do you have minor children or grandchildren you want to include as beneficiaries?"
        required
        options={["Yes", "No"]}
        name="trustHasMinors"
        register={register}
        error={errors.trustHasMinors?.message}
      />
      <RadioGroup
        legend="Do you own real property (home, land, rental property)?"
        required
        options={["Yes", "No"]}
        name="trustOwnsProperty"
        register={register}
        error={errors.trustOwnsProperty?.message}
      />
      {ownsProperty === "Yes" && (
        <Field
          id="trustPropertyCount"
          label="How many properties?"
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
        legend="Do you have significant financial accounts or assets to include?"
        required
        options={["Yes", "No", "Not sure"]}
        name="trustHasAssets"
        register={register}
        error={errors.trustHasAssets?.message}
      />
      <RadioGroup
        legend="Do you already have a will or existing estate planning documents?"
        required
        options={["Yes", "No", "Not sure"]}
        name="trustExistingDocs"
        register={register}
        error={errors.trustExistingDocs?.message}
      />
      <RadioGroup
        legend="Who would you like to name as your successor trustee?"
        required
        options={TRUST_SUCCESSOR_OPTIONS}
        name="trustSuccessor"
        register={register}
        error={errors.trustSuccessor?.message}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PoaBranch({ register, control, watch, errors }: any) {
  const hasReason = watch("poaHasReason");
  return (
    <div className="space-y-6">
      <CheckboxGrid
        legend="What type of Power of Attorney do you need?"
        required
        options={POA_TYPES}
        name="poaTypes"
        control={control}
        error={errors.poaTypes?.message as string | undefined}
      />
      <RadioGroup
        legend="Who will be the agent (the person given authority)?"
        required
        options={AGENT_OPTIONS}
        name="poaAgent"
        register={register}
        error={errors.poaAgent?.message}
      />
      <RadioGroup
        legend="Is there a specific reason or deadline for needing this document?"
        required
        options={["Yes", "No"]}
        name="poaHasReason"
        register={register}
        error={errors.poaHasReason?.message}
      />
      {hasReason === "Yes" && (
        <Field
          id="poaReason"
          label="Please describe"
          required
          error={errors.poaReason?.message}
        >
          <textarea
            id="poaReason"
            rows={3}
            {...register("poaReason")}
            className={inputBase}
            placeholder='e.g. "upcoming surgery", "traveling abroad"'
          />
        </Field>
      )}
      <RadioGroup
        legend="Do you need this document notarized?"
        required
        options={["Yes", "No", "Not sure"]}
        name="poaNotarize"
        register={register}
        error={errors.poaNotarize?.message}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DmvBranch({ register, control, watch, errors }: any) {
  const hasAppt = watch("dmvHasAppointment");
  return (
    <div className="space-y-6">
      <CheckboxGrid
        legend="What type of DMV form do you need help completing?"
        required
        options={DMV_FORM_OPTIONS}
        name="dmvFormTypes"
        control={control}
        error={errors.dmvFormTypes?.message as string | undefined}
      />
      <RadioGroup
        legend="Do you have a DMV appointment scheduled?"
        required
        options={["Yes", "No"]}
        name="dmvHasAppointment"
        register={register}
        error={errors.dmvHasAppointment?.message}
      />
      {hasAppt === "Yes" && (
        <Field
          id="dmvAppointmentDate"
          label="What is the appointment date?"
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
        label="Additional details about what you need"
        error={errors.dmvDetails?.message}
      >
        <textarea
          id="dmvDetails"
          rows={4}
          {...register("dmvDetails")}
          className={inputBase}
          placeholder="Optional"
        />
      </Field>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TaxBranch({ register, control, watch, errors }: any) {
  const hasDeadline = watch("taxHasDeadline");
  return (
    <div className="space-y-6">
      <CheckboxGrid
        legend="What type of tax document assistance do you need?"
        required
        options={TAX_TYPE_OPTIONS}
        name="taxTypes"
        control={control}
        error={errors.taxTypes?.message as string | undefined}
      />
      <Select
        id="taxYear"
        label="What tax year(s) are involved?"
        required
        options={TAX_YEARS}
        register={register}
        name="taxYear"
        placeholder="Select year…"
        error={errors.taxYear?.message}
      />
      <RadioGroup
        legend="Do you have a filing deadline?"
        required
        options={["Yes", "No"]}
        name="taxHasDeadline"
        register={register}
        error={errors.taxHasDeadline?.message}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="taxDeadlineDate"
          label="What is the deadline?"
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
        label="Additional notes"
        error={errors.taxNotes?.message}
      >
        <textarea
          id="taxNotes"
          rows={4}
          {...register("taxNotes")}
          className={inputBase}
          placeholder="Optional"
        />
      </Field>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OtherBranch({ register, watch, errors }: any) {
  const hasDeadline = watch("otherHasDeadline");
  return (
    <div className="space-y-6">
      <Field
        id="otherDescription"
        label="Please describe what documents you need help preparing"
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
        legend="Do you have a deadline or court date?"
        required
        options={["Yes", "No"]}
        name="otherHasDeadline"
        register={register}
        error={errors.otherHasDeadline?.message}
      />
      {hasDeadline === "Yes" && (
        <Field
          id="otherDeadlineDate"
          label="What is the date?"
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

function ReviewSummary({ data }: { data: Partial<IntakeData> }) {
  const rows: Array<[string, string | undefined]> = [
    ["Name", [data.firstName, data.lastName].filter(Boolean).join(" ")],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Preferred contact", data.contactMethod],
    [
      "Best time",
      data.bestTime === "LateAfternoon" ? "Late Afternoon" : data.bestTime,
    ],
    ["Primary service", data.primaryService],
    [
      "Additional services",
      data.needsMoreServices === "Yes"
        ? data.additionalServices?.join(", ")
        : undefined,
    ],

    // Divorce
    ["Divorce type", data.divorceType],
    ["Minor children", data.divorceHasChildren],
    ["Number of children", data.divorceChildrenCount],
    ["Ages of children", data.divorceChildrenAges],
    ["Real property", data.divorceHasProperty],
    ["Significant assets", data.divorceHasAssets],
    ["Marriage length", data.divorceMarriageLength],
    ["Filing county", data.divorceFilingCounty],
    ["Already filed", data.divorceFiledPaperwork],

    // Eviction
    ["Party", data.evictionParty],
    ["Property type", data.evictionPropertyType],
    ["Eviction reason", data.evictionReason],
    ["Notice served", data.evictionNoticeServed],
    ["Notice type", data.evictionNoticeType],
    ["Notice date", data.evictionNoticeDate],
    ["Property county", data.evictionCounty],
    ["Tenant vacated", data.evictionTenantVacated],
    ["Monthly rent", data.evictionRent],

    // Immigration
    ["Immigration forms", data.immigrationForms?.join(", ")],
    ["Other forms detail", data.immigrationFormsOther],
    ["Application for", data.immigrationForWhom],
    ["Immigration status", data.immigrationStatus],
    [
      "Deadline",
      data.immigrationHasDeadline === "Yes"
        ? data.immigrationDeadlineDate || "Yes"
        : data.immigrationHasDeadline,
    ],
    ["Previously filed", data.immigrationPreviouslyFiled],

    // Trust
    ["Trust for", data.trustType],
    ["Minor beneficiaries", data.trustHasMinors],
    ["Owns real property", data.trustOwnsProperty],
    ["Number of properties", data.trustPropertyCount],
    ["Significant assets", data.trustHasAssets],
    ["Existing estate docs", data.trustExistingDocs],
    ["Successor trustee", data.trustSuccessor],

    // POA
    ["POA types", data.poaTypes?.join(", ")],
    ["POA agent", data.poaAgent],
    [
      "POA reason",
      data.poaHasReason === "Yes" ? data.poaReason || "Yes" : data.poaHasReason,
    ],
    ["Notarize", data.poaNotarize],

    // DMV
    ["DMV forms", data.dmvFormTypes?.join(", ")],
    [
      "DMV appointment",
      data.dmvHasAppointment === "Yes"
        ? data.dmvAppointmentDate || "Yes"
        : data.dmvHasAppointment,
    ],
    ["DMV details", data.dmvDetails],

    // Tax
    ["Tax assistance", data.taxTypes?.join(", ")],
    ["Tax year", data.taxYear],
    [
      "Tax deadline",
      data.taxHasDeadline === "Yes"
        ? data.taxDeadlineDate || "Yes"
        : data.taxHasDeadline,
    ],
    ["Tax notes", data.taxNotes],

    // Other
    ["Description", data.otherDescription],
    [
      "Deadline",
      data.otherHasDeadline === "Yes"
        ? data.otherDeadlineDate || "Yes"
        : data.otherHasDeadline,
    ],

    // General
    ["Your county", data.clientCounty],
    ["Heard about us via", data.referralSource],
    ["Referred by", data.referralName],
    ["Additional notes", data.additionalNotes],
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

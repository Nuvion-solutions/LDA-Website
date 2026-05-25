"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { BUSINESS } from "@/lib/utils";

const DOCUMENT_TYPES = [
  "Divorce / Family Law Forms",
  "Eviction (Unlawful Detainer) Paperwork",
  "Immigration Forms",
  "Living Trust",
  "Power of Attorney",
  "DMV Form Assistance",
  "Tax Document Organization (Clerical)",
  "Other (please describe below)",
] as const;

const COUNTIES = [
  "Sonoma",
  "Napa",
  "Marin",
  "Alameda",
  "Contra Costa",
  "San Francisco",
  "Sacramento",
  "Other",
] as const;

const REFERRAL_SOURCES = [
  "Google Search",
  "Social Media",
  "Referral",
  "Nextdoor",
  "Other",
] as const;

const intakeSchema = z.object({
  // Step 1
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(30, "Phone number is too long"),
  email: z.string().email("Please enter a valid email address"),
  contactMethod: z.enum(["Phone", "Email", "Text"], {
    message: "Please choose how to reach you",
  }),
  bestTime: z.enum(["Morning", "Afternoon", "LateAfternoon"], {
    message: "Please choose the best time",
  }),

  // Step 2
  documentTypes: z
    .array(z.string())
    .min(1, "Please select at least one document type"),
  otherDocuments: z.string().max(2000).optional().or(z.literal("")),
  hasStartedPaperwork: z.enum(["Yes", "No", "Not Sure"], {
    message: "Please choose an option",
  }),
  hasDeadline: z.enum(["Yes", "No"], { message: "Please choose an option" }),
  deadlineDate: z.string().optional().or(z.literal("")),

  // Step 3
  filingCounty: z.enum(COUNTIES, { message: "Please choose a county" }),
  workingWithOthers: z.enum(["Yes", "No", "Not Sure"], {
    message: "Please choose an option",
  }),
  referralSource: z.enum(REFERRAL_SOURCES, {
    message: "Please choose how you heard about us",
  }),
  referralName: z.string().max(200).optional().or(z.literal("")),
  additionalNotes: z.string().max(4000).optional().or(z.literal("")),

  // Step 4
  consentLDA: z.literal(true, {
    message: "You must acknowledge this to continue",
  }),
  consentContact: z.literal(true, {
    message: "You must consent to be contacted",
  }),
});

export type IntakeData = z.infer<typeof intakeSchema>;

const STEPS = ["Contact", "Documents", "Situation", "Confirm"] as const;

const STEP_FIELDS: Array<Array<keyof IntakeData>> = [
  ["firstName", "lastName", "phone", "email", "contactMethod", "bestTime"],
  [
    "documentTypes",
    "otherDocuments",
    "hasStartedPaperwork",
    "hasDeadline",
    "deadlineDate",
  ],
  [
    "filingCounty",
    "workingWithOthers",
    "referralSource",
    "referralName",
    "additionalNotes",
  ],
  ["consentLDA", "consentContact"],
];

const inputBase =
  "w-full bg-white border border-[var(--color-border-light)] rounded-sm px-4 py-3 text-[var(--color-body-dark)] focus:border-[var(--color-gold)] focus:outline-none transition-colors";
const labelBase =
  "block text-sm font-medium text-[var(--color-navy)] mb-2";
const errorBase = "mt-1.5 text-xs text-red-600";

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
    // onTouched + reValidate onChange = errors only appear after the user
    // has interacted with a field, and clear immediately once it becomes
    // valid. Critical for checkboxes/radios where a "blur" event isn't
    // intuitive UX.
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      documentTypes: [],
      otherDocuments: "",
      referralName: "",
      additionalNotes: "",
      deadlineDate: "",
    },
  });

  const hasDeadline = watch("hasDeadline");
  const referralSource = watch("referralSource");

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
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
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-1">
                Contact Information
              </h2>
              <p className="text-[var(--color-body-dark)] opacity-80 mb-8">
                How can we reach you?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className={labelBase}>
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="firstName"
                    autoComplete="given-name"
                    {...register("firstName")}
                    className={inputBase}
                  />
                  {errors.firstName && (
                    <p className={errorBase}>{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className={labelBase}>
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="lastName"
                    autoComplete="family-name"
                    {...register("lastName")}
                    className={inputBase}
                  />
                  {errors.lastName && (
                    <p className={errorBase}>{errors.lastName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className={labelBase}>
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className={inputBase}
                  />
                  {errors.phone && (
                    <p className={errorBase}>{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className={labelBase}>
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className={inputBase}
                  />
                  {errors.email && (
                    <p className={errorBase}>{errors.email.message}</p>
                  )}
                </div>
              </div>

              <fieldset className="mt-7">
                <legend className={labelBase}>
                  Best way to contact you <span className="text-red-600">*</span>
                </legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {(["Phone", "Email", "Text"] as const).map((opt) => (
                    <label
                      key={opt}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5"
                    >
                      <input
                        type="radio"
                        value={opt}
                        {...register("contactMethod")}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.contactMethod && (
                  <p className={errorBase}>{errors.contactMethod.message}</p>
                )}
              </fieldset>

              <div className="mt-7">
                <label htmlFor="bestTime" className={labelBase}>
                  Best time to reach you <span className="text-red-600">*</span>
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
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-1">
                Document Needs
              </h2>
              <p className="text-[var(--color-body-dark)] opacity-80 mb-8">
                What kind of paperwork do you need prepared?
              </p>

              <fieldset>
                <legend className={labelBase}>
                  Document type(s) <span className="text-red-600">*</span>
                </legend>
                <Controller
                  control={control}
                  name="documentTypes"
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {DOCUMENT_TYPES.map((doc) => {
                        const checked = field.value?.includes(doc) ?? false;
                        return (
                          <label
                            key={doc}
                            className="flex items-center gap-3 px-4 py-3 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                const next = e.target.checked
                                  ? [...(field.value ?? []), doc]
                                  : (field.value ?? []).filter(
                                      (v) => v !== doc,
                                    );
                                field.onChange(next);
                              }}
                              className="accent-[var(--color-gold)] h-4 w-4"
                            />
                            <span className="text-sm">{doc}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.documentTypes && (
                  <p className={errorBase}>
                    {errors.documentTypes.message as string}
                  </p>
                )}
              </fieldset>

              <div className="mt-6">
                <label htmlFor="otherDocuments" className={labelBase}>
                  Please describe what documents you need prepared
                </label>
                <textarea
                  id="otherDocuments"
                  rows={4}
                  {...register("otherDocuments")}
                  className={inputBase}
                  placeholder="Optional — add detail if you chose Other or want to give context."
                />
              </div>

              <fieldset className="mt-6">
                <legend className={labelBase}>
                  Have you already started any paperwork?{" "}
                  <span className="text-red-600">*</span>
                </legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {(["Yes", "No", "Not Sure"] as const).map((opt) => (
                    <label
                      key={opt}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5"
                    >
                      <input
                        type="radio"
                        value={opt}
                        {...register("hasStartedPaperwork")}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.hasStartedPaperwork && (
                  <p className={errorBase}>
                    {errors.hasStartedPaperwork.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="mt-6">
                <legend className={labelBase}>
                  Do you have a deadline or court date?{" "}
                  <span className="text-red-600">*</span>
                </legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {(["Yes", "No"] as const).map((opt) => (
                    <label
                      key={opt}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5"
                    >
                      <input
                        type="radio"
                        value={opt}
                        {...register("hasDeadline")}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.hasDeadline && (
                  <p className={errorBase}>{errors.hasDeadline.message}</p>
                )}
              </fieldset>

              {hasDeadline === "Yes" && (
                <div className="mt-6">
                  <label htmlFor="deadlineDate" className={labelBase}>
                    What is your deadline or court date?
                  </label>
                  <input
                    id="deadlineDate"
                    type="date"
                    {...register("deadlineDate")}
                    className={inputBase}
                  />
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-1">
                Your Situation
              </h2>
              <p className="text-[var(--color-body-dark)] opacity-80 mb-8">
                A few details about your matter help us prepare a fast,
                accurate response.
              </p>

              <div>
                <label htmlFor="filingCounty" className={labelBase}>
                  County where documents will be filed{" "}
                  <span className="text-red-600">*</span>
                </label>
                <select
                  id="filingCounty"
                  {...register("filingCounty")}
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
                {errors.filingCounty && (
                  <p className={errorBase}>{errors.filingCounty.message}</p>
                )}
              </div>

              <fieldset className="mt-6">
                <legend className={labelBase}>
                  Are you working with any other professionals on this matter?{" "}
                  <span className="text-red-600">*</span>
                </legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {(["Yes", "No", "Not Sure"] as const).map((opt) => (
                    <label
                      key={opt}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border-light)] rounded-sm cursor-pointer hover:border-[var(--color-gold)] transition-colors has-checked:border-[var(--color-gold)] has-checked:bg-[var(--color-gold)]/5"
                    >
                      <input
                        type="radio"
                        value={opt}
                        {...register("workingWithOthers")}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.workingWithOthers && (
                  <p className={errorBase}>
                    {errors.workingWithOthers.message}
                  </p>
                )}
              </fieldset>

              <div className="mt-6">
                <label htmlFor="referralSource" className={labelBase}>
                  How did you hear about us?{" "}
                  <span className="text-red-600">*</span>
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
                    Who referred you?
                  </label>
                  <input
                    id="referralName"
                    {...register("referralName")}
                    className={inputBase}
                  />
                </div>
              )}

              <div className="mt-6">
                <label htmlFor="additionalNotes" className={labelBase}>
                  Anything else you&apos;d like us to know about your situation?
                </label>
                <textarea
                  id="additionalNotes"
                  rows={5}
                  {...register("additionalNotes")}
                  className={inputBase}
                  placeholder="Optional — share any background that will help us serve you."
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-navy)] mb-1">
                Review &amp; Confirm
              </h2>
              <p className="text-[var(--color-body-dark)] opacity-80 mb-8">
                Quick review of what you&apos;ve told us, then two
                acknowledgments before you submit.
              </p>

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
                    directing the preparation of my own documents.{" "}
                    <span className="text-red-600">*</span>
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
                    my inquiry. <span className="text-red-600">*</span>
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
            </motion.div>
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
    ["Documents needed", data.documentTypes?.join(", ")],
    ["Other / details", data.otherDocuments],
    ["Started paperwork", data.hasStartedPaperwork],
    [
      "Deadline",
      data.hasDeadline === "Yes"
        ? data.deadlineDate || "Yes (date not provided)"
        : data.hasDeadline,
    ],
    ["Filing county", data.filingCounty],
    ["Working with others", data.workingWithOthers],
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

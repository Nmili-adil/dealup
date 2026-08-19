"use client";

import { useId, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leadFormSchema, type LeadFormValues } from "@/lib/validation/lead-form-schema";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldName = keyof LeadFormValues;

export function FinalCtaForm({ dictionary }: { dictionary: Dictionary["finalCta"]["form"] }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const formId = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    // Validate on blur, then keep correcting as the user types — avoids
    // shouting at someone mid-way through their first keystroke.
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (values: LeadFormValues) => {
    setStatus("submitting");
    try {
      if (!apiUrl) throw new Error("Missing API URL");

      const response = await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "homepage_final_cta" }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl border border-brand/30 bg-surface-mint p-6 text-brand-dark"
      >
        <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
        <p className="font-medium">{dictionary.successMessage}</p>
      </div>
    );
  }

  const fields: {
    name: FieldName;
    label: string;
    placeholder: string;
    type: string;
    autoComplete: string;
    inputMode?: "email" | "tel";
    required: boolean;
    error?: FieldError;
  }[] = [
    {
      name: "name",
      label: dictionary.nameLabel,
      placeholder: dictionary.namePlaceholder,
      type: "text",
      autoComplete: "name",
      required: true,
      error: errors.name,
    },
    {
      name: "email",
      label: dictionary.emailLabel,
      placeholder: dictionary.emailPlaceholder,
      type: "email",
      autoComplete: "email",
      inputMode: "email",
      required: true,
      error: errors.email,
    },
    {
      name: "phone",
      label: dictionary.phoneLabel,
      placeholder: dictionary.phonePlaceholder,
      type: "tel",
      autoComplete: "tel",
      inputMode: "tel",
      required: true,
      error: errors.phone,
    },
    {
      name: "company",
      label: dictionary.companyLabel,
      placeholder: dictionary.companyPlaceholder,
      type: "text",
      autoComplete: "organization",
      required: false,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const inputId = `${formId}-${field.name}`;
          const errorId = `${inputId}-error`;
          const message =
            field.error &&
            (dictionary.errors[field.name as keyof typeof dictionary.errors] ??
              field.error.message);

          return (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label
                htmlFor={inputId}
                className="text-sm font-medium text-text-primary"
              >
                {field.label}
                {field.required ? (
                  <span className="ms-0.5 text-brand-hover" aria-hidden="true">
                    *
                  </span>
                ) : (
                  <span className="ms-1 font-normal text-text-secondary">
                    ({dictionary.optionalLabel})
                  </span>
                )}
              </label>

              <input
                id={inputId}
                {...register(field.name)}
                type={field.type}
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                aria-required={field.required || undefined}
                aria-invalid={field.error ? true : undefined}
                aria-describedby={field.error ? errorId : undefined}
                className={cn(
                  "h-12 rounded-xl border bg-white px-4 text-sm text-text-primary transition-colors",
                  "placeholder:text-text-secondary/70",
                  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-hover",
                  field.error
                    ? "border-red-500"
                    : "border-border hover:border-brand/40"
                )}
              />

              {/* Error sits next to its field and is announced on appearance. */}
              {message ? (
                <p
                  id={errorId}
                  role="alert"
                  className="flex items-start gap-1.5 text-xs font-medium text-red-700"
                >
                  <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                  {message}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {dictionary.errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-fit"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {dictionary.loadingLabel}
          </>
        ) : (
          dictionary.submitLabel
        )}
      </Button>

      <p className="text-xs leading-relaxed text-text-secondary">
        {dictionary.privacyNote}
      </p>
    </form>
  );
}

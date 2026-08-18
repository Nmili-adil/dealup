"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leadFormSchema, type LeadFormValues } from "@/lib/validation/lead-form-schema";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function FinalCtaForm({ dictionary }: { dictionary: Dictionary["finalCta"]["form"] }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({ resolver: zodResolver(leadFormSchema) });

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
      <div className="flex items-center gap-3 rounded-2xl border border-brand/30 bg-surface-mint p-6 text-brand-dark">
        <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
        <p className="font-medium">{dictionary.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <input
            {...register("name")}
            type="text"
            placeholder={dictionary.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            className="h-12 rounded-xl border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <input
            {...register("email")}
            type="email"
            placeholder={dictionary.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            className="h-12 rounded-xl border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <input
            {...register("phone")}
            type="tel"
            placeholder={dictionary.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            className="h-12 rounded-xl border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <input
            {...register("company")}
            type="text"
            placeholder={dictionary.companyPlaceholder}
            className="h-12 rounded-xl border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          {dictionary.errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-fit">
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {dictionary.loadingLabel}
          </>
        ) : (
          dictionary.submitLabel
        )}
      </Button>

      <p className="text-xs text-text-muted">{dictionary.privacyNote}</p>
    </form>
  );
}

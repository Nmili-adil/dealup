import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6).max(30),
  company: z.string().trim().max(120).optional().or(z.literal("")),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

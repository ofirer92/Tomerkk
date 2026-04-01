import { z } from "zod";

// ─── Enums ──────────────────────────────────────────────────────────────────

export const ServiceType = z.enum([
  "spring",
  "opener",
  "off-track",
  "installation",
  "other",
]);
export type ServiceType = z.infer<typeof ServiceType>;

export const JobStatus = z.enum([
  "waiting_for_parts",
  "appointment_confirmed",
  "job_completed",
]);
export type JobStatus = z.infer<typeof JobStatus>;

export const QrTarget = z.enum(["estimate", "portal"]);
export type QrTarget = z.infer<typeof QrTarget>;

export const AppointmentStatus = z.enum([
  "new",
  "contacted",
  "converted",
  "closed",
]);
export type AppointmentStatus = z.infer<typeof AppointmentStatus>;

export const EventType = z.enum([
  "estimate_request",
  "qr_scan",
  "portal_login",
  "customer_created",
]);
export type EventType = z.infer<typeof EventType>;

// ─── Database row types ───────────────────────────────────────────────────────

export interface Customer {
  id: string;
  code: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  is_vip: boolean;
  vip_discount_pct: number;
  notes: string | null;
  qr_target: QrTarget;
  created_at: string;
}

export interface Job {
  id: string;
  customer_id: string;
  description: string;
  service_type: ServiceType;
  status: JobStatus;
  cost: number | null;
  technician_notes: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string | null;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  preferred_date: string | null;
  preferred_time: string | null;
  service_interest: string | null;
  source: string;
  status: AppointmentStatus;
  created_at: string;
}

export interface SiteEvent {
  id: string;
  event_type: EventType;
  customer_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// ─── Zod schemas for API validation ──────────────────────────────────────────

export const EstimateFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  preferred_date: z.string().optional(),
  preferred_time: z.enum(["morning", "afternoon", "evening"]).optional(),
  service_interest: z.string().optional(),
  source: z.string().optional(),
});
// Use input type for forms (before Zod transforms/defaults are applied)
export type EstimateFormValues = z.input<typeof EstimateFormSchema>;

export const PortalLoginSchema = z.object({
  code: z
    .string()
    .regex(/^TOMER-\d{4}$/, "Code must be in format TOMER-XXXX"),
});
export type PortalLoginValues = z.infer<typeof PortalLoginSchema>;

export const CreateCustomerSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  is_vip: z.boolean().optional(),
  vip_discount_pct: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  qr_target: QrTarget.optional(),
});
export type CreateCustomerValues = z.input<typeof CreateCustomerSchema>;

export const UpdateJobStatusSchema = z.object({
  status: JobStatus,
});
export type UpdateJobStatusValues = z.infer<typeof UpdateJobStatusSchema>;

export const CreateJobSchema = z.object({
  customer_id: z.string().uuid(),
  description: z.string().min(2),
  service_type: ServiceType,
  status: JobStatus.default("appointment_confirmed"),
  cost: z.number().optional(),
  technician_notes: z.string().optional(),
});
export type CreateJobValues = z.infer<typeof CreateJobSchema>;

// ─── JWT payload ─────────────────────────────────────────────────────────────

export interface CustomerJwtPayload {
  customerId: string;
  code: string;
}

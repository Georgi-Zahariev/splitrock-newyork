import { z } from 'zod';

/**
 * Quote form validation schema
 * Validates all fields from the QuoteForm component with comprehensive rules
 */
export const quoteFormSchema = z.object({
  // Contact information
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must not exceed 80 characters')
    .trim(),

  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 characters')
    .max(30, 'Phone number must not exceed 30 characters')
    .trim(),

  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters')
    .trim(),

  // Service selection
  landscaping: z.boolean(),

  outdoorConstruction: z.boolean(),

  // Project details
  details: z
    .string()
    .min(10, 'Project details must be at least 10 characters')
    .max(2000, 'Project details must not exceed 2000 characters')
    .trim(),

  // Honeypot field for bot detection
  // Legitimate users should never fill this field
  honeypot: z
    .string()
    .optional()
    .refine((val) => !val || val === '', {
      message: 'Invalid submission detected',
    }),
});

/**
 * Additional validation: at least one service must be selected
 */
export const quoteFormSchemaWithServiceCheck = quoteFormSchema.refine(
  (data) => data.landscaping || data.outdoorConstruction,
  {
    message: 'Please select at least one service',
    path: ['landscaping'], // Show error on landscaping field
  }
);

/**
 * TypeScript types inferred from the schema
 */
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type QuoteFormInput = z.input<typeof quoteFormSchema>;
export type QuoteFormOutput = z.output<typeof quoteFormSchema>;

/**
 * Helper type for API responses
 */
export interface QuoteFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

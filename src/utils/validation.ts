import { z } from 'zod';

// Contact Form Validation
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// WhatsApp Message Validation
export const whatsappMessageSchema = z.object({
  message: z.string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message must be less than 1000 characters'),
  phone: z.string()
    .regex(/^\d{10,}$/, 'Please enter a valid phone number'),
});

export type WhatsappMessageData = z.infer<typeof whatsappMessageSchema>;

// Product Filter Validation
export const productFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  search: z.string().max(100).optional(),
  sortBy: z.enum(['newest', 'price-low', 'price-high', 'popular']).optional(),
});

export type ProductFilter = z.infer<typeof productFilterSchema>;

// Validation utility function
export const validateForm = async <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ valid: boolean; data?: T; errors?: Record<string, string> }> => {
  try {
    const result = await schema.parseAsync(data);
    return { valid: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { valid: false, errors };
    }
    return { valid: false, errors: { general: 'Validation error' } };
  }
};

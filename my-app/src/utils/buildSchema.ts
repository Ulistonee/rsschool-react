import { z } from 'zod';
import { allowedTypes, MAX_SIZE } from '../constants/constants.ts';

export const buildSchema = (countries: string[]) => {
  const NAME_WORD = /^[\p{Lu}][\p{L}\p{M}'-]*$/u;

  const schema = z.object({
    name: z.string()
      .trim()
      .min(1, 'Name is required')
      .refine(
        (val) => val.split(/\s+/).every((w) => NAME_WORD.test(w)),
        'Each word must start with an uppercase letter'
      ),
    age: z.preprocess(
      (v) => {
        if (typeof v === "string") {
          const trimmed = v.trim();
          if (trimmed === "") return undefined;
          const n = Number(trimmed);
          return Number.isNaN(n) ? undefined : n;
        }
        if (typeof v === "number") return Number.isNaN(v) ? undefined : v;
        return undefined;
      },
      z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number"
      }).min(0, "Age cannot be negative")
    ),
    email: z.string().email('Invalid email'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirm: z.string().min(1, "Please confirm password"),
    gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Gender is required' }) }),
    acceptTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept T&C' }) }),
    country: z.string()
      .min(1, 'Country is required')
      .refine((val) => countries.includes(val), 'Select a country from the list'),
    picture: z.preprocess(
      (val) => {
        if (val instanceof FileList) return val.length > 0 ? val[0] : undefined;
        return val;
      },
      z.any()
        .refine((f) => f == null || f instanceof File, 'Invalid file')
        .refine((f) => !f || allowedTypes.includes(f.type), 'Only PNG or JPEG')
        .refine((f) => !f || f.size <= MAX_SIZE, 'Max file size 2MB')
    ),
  });

  return schema.superRefine((data, ctx) => {
    if (data.password !== data.confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirm'],
        message: 'Passwords do not match',
      });
    }
  });
};

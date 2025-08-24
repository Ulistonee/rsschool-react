import { z } from 'zod';
import { allowedTypes, MAX_SIZE } from '../constants/constants.ts';

export const buildSchema = (countries: string[]) => {
  const NAME_WORD = /^[\p{Lu}][\p{L}\p{M}'-]*$/u;

  return z.object({
    name: z.string()
      .trim()
      .min(1, 'Name is required')
      .refine(
        (val) => val.split(/\s+/).every((w) => NAME_WORD.test(w)),
        'Each word must start with an uppercase letter'
      ),
    age: z.preprocess(
      (v) => (typeof v === 'string' ? Number(v) : v),
      z.number({ invalid_type_error: 'Age must be a number' })
        .min(0, 'Age cannot be negative')
    ),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirm: z.string(),
    gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Gender is required' }) }),
    acceptTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept T&C' }) }),
    country: z
      .string()
      .min(1, 'Country is required')
      .refine((val) => countries.includes(val), 'Select a country from the list'),
    picture: z
      .any()
      .refine((f) => f == null || f instanceof File, 'Invalid file')
      .refine((f) => !f || allowedTypes.includes(f.type), 'Only PNG or JPEG')
      .refine((f) => !f || f.size <= MAX_SIZE, 'Max file size 2MB'),
  })
    .refine((data) => data.password === data.confirm, {
      path: ['confirm'],
      message: 'Passwords do not match',
    });
}


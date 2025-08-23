import z from 'zod';

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const schema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .regex(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter'),
    age: z
      .number({ invalid_type_error: 'Age must be a number' })
      .min(0, 'Age must be positive'),
    email: z.string().email('Invalid email'),
    password: passwordSchema,
    confirmPassword: z.string().nonempty('Please confirm password'),
    gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Gender is required' }) }),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' }),
    }),
    country: z.string().nonempty('Country is required'),
    picture: z
      .any()
      .refine((files) => files?.length === 1, 'Picture is required')
      .refine(
        (files) => {
          if (!files?.[0]) return false;
          return ['image/png', 'image/jpeg'].includes(files[0].type);
        },
        'Only PNG or JPEG allowed'
      )
      .refine(
        (files) => {
          if (!files?.[0]) return false;
          return files[0].size <= 2 * 1024 * 1024;
        },
        'File size must be less than 2MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

import type { FieldConfig } from '../utils/getFormValues.ts';

export const allowedTypes = ['image/png', 'image/jpeg'];
export const MAX_SIZE = 2 * 1024 * 1024;
export const fields: FieldConfig[] = [
  { name: 'name', type: 'string', inputType: 'text'},
  { name: 'age', type: 'string', inputType: 'number'},
  { name: 'email', type: 'string', inputType: 'email' },
  { name: 'password', type: 'string', inputType: 'password' },
  { name: 'confirm', type: 'string', inputType: 'password' },
  { name: 'gender', type: 'string', inputType: 'radio' },
  { name: 'country', type: 'string', inputType: 'select' },
  { name: 'picture', type: 'file', inputType: 'file' },
  { name: 'acceptTerms', type: 'boolean', inputType: 'checkbox' },
];

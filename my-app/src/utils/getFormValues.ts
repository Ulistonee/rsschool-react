type FieldType = 'string' | 'number' | 'boolean' | 'file';
type InputType = 'text' | 'email' | 'number' | 'password' | 'radio' | 'checkbox' | 'file' | 'select';

export type FieldConfig = {
  name: string;
  type: FieldType;
  inputType: InputType;
}

export const getFormValues = (
  formData: FormData,
  fields: FieldConfig[]
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const { name, type } of fields) {
    const rawValue = formData.get(name);

    let value: unknown;

    switch (type) {
      case 'string':
        value = typeof rawValue === 'string' ? rawValue : '';
        break;

      case 'boolean':
        value = rawValue !== null;
        break;

      case 'file':
        value = rawValue instanceof File ? rawValue :  null;
        break;
    }

    result[name] = value;
  }

  return result;
};

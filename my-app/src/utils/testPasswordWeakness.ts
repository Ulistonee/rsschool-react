export const testPasswordWeakness = (password: string) => {
  return [
    /[0-9]/.test(password),
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 6,
  ];
}

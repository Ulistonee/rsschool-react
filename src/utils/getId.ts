export function getId(url: string): string {
  const id = url.split('/').filter(Boolean).pop();
  if (!id) {
    throw new Error(`Invalid URL: "${url}"`);
  }
  return id;
}

export function formatPopulation(value: number | undefined): string {
  if (value === undefined || value === null) return 'N/A';
  return (value / 1_000_000).toFixed(2) + ' M';
}

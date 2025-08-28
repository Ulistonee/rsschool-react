export function formatValue(key: string, value: unknown): string {
  if (value === undefined || value === null) return 'N/A';

  if (key === 'year') {
    return String(value);
  }

  const formatNumber = (num: number): string => {
    return parseFloat(num.toFixed(2)).toString();
  };

  if (typeof value === 'number') {
    if (key === 'co2') {
      return value.toFixed(2);
    }
    if (key === 'co2_per_capita') {
      return value.toFixed(2);
    }

    if (value >= 1_000_000_000) {
      return formatNumber(value / 1_000_000_000) + 'B';
    }
    if (value >= 1_000_000) {
      return formatNumber(value / 1_000_000) + 'M';
    }
    if (value >= 1_000) {
      return formatNumber(value / 1_000) + 'K';
    }

    return formatNumber(value);
  }

  return String(value);
}

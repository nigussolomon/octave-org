export function formatETB(value: number | string): string {
  if (typeof value === 'string') {
    value = value.replace(/ETB\s?/i, '').replace(/,/g, '');
    value = parseFloat(value);
  }

  if (!Number.isFinite(value)) return '';

  const [whole, cents] = value.toFixed(2).split('.');
  return `${Number(whole).toLocaleString('en-ET')}.${cents} ETB`;
}

export function percentToFloat(value: string | number) {
  if (typeof value === 'string') {
    value = value.replace(/%/g, '').replace(/,/g, '');
    value = parseFloat(value);
  }
  if (!Number.isFinite(value)) return 0;
  return value / 100;
}

export function floatToPercent(value: string | number) {
  if (typeof value === 'string') {
    value = value.replace(/%/g, '').replace(/,/g, '');
    value = parseFloat(value);
  }
  if (!Number.isFinite(value)) return 0;
  return `${(value * 100).toFixed(0)}%`;
}

export function formatDate(value: string) {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-ET', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function UnderscoreToTitleCase(value: string) {
  if (!value) return '';
  return value.replace(/_/g, ' ').replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function TitleCaseToUnderscore(value: string) {
  if (!value) return '';
  return value.replace(/\s+/g, '_').toLowerCase();
}

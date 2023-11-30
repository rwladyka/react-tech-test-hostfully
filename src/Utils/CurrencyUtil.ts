/**
 * Formats a numeric value as a currency string in USD (United States Dollar).
 *
 * @param {number} value - The numeric value to be formatted as currency.
 * @returns {string} The currency string formatted in USD, e.g., '$1,234.56'.
 *
 * @example
 * const result = formatCurrency(1234.56);
 * // Result: '$1,234.56'
 */
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

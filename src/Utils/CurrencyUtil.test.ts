import { formatCurrency } from './CurrencyUtil'

describe('CurrencyUtil', () => {
  it.each([
    [630, '$630.00'],
    [830, '$830.00'],
    [650, '$650.00'],
    [220, '$220.00'],
    [1234.56, '$1,234.56'],
    [-789.01, '-$789.01'],
    [0, '$0.00'],
  ])('should format value %s', (value, result) => {
    expect(formatCurrency(value)).toBe(result)
  })
})

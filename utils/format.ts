import Decimal from 'decimal.js'

export const formatMina = (val: number | string) => {
  return new Decimal(val).div(1e9).toString()
}

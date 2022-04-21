import StockEntry from '../entities/stock-entry'

export default class StockCalculator {
  calculate (stockEntries: StockEntry[]): number {
    let total = 0
    for (const { operation, quantity } of stockEntries) {
      if (operation === 'in') total += quantity
      if (operation === 'out') total -= quantity
    }
    return total
  }
}

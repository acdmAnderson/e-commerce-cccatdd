import StockEntry from '../entities/stock-entry'

export default class StockEntryCalculator {
  private total
  constructor (private readonly stockEntries: StockEntry[]) {
    this.total = 0
  }

  calculate (): number {
    for (const { operation, quantity } of this.stockEntries) {
      if (operation === 'in') this.total += quantity
      if (operation === 'out') this.total -= quantity
    }
    return this.total
  }
}

import StockEntry from '../../../../src/domain/entities/stock-entry'
import StockEntryCalculator from '../../../../src/domain/service/stock-entry-calculator'

test('Should calculate stock', () => {
  const stockEntryCalculator = new StockEntryCalculator([
    new StockEntry(1, 'in', 6),
    new StockEntry(1, 'out', 2),
    new StockEntry(1, 'in', 2)
  ])
  const total = stockEntryCalculator.calculate()
  expect(total).toBe(6)
})

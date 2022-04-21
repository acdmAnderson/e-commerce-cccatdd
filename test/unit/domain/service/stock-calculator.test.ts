import StockEntry from '../../../../src/domain/entities/stock-entry'
import StockCalculator from '../../../../src/domain/service/stock-calculator'

test('Should calculate stock', () => {
  const stockEntryCalculator = new StockCalculator()
  const total = stockEntryCalculator.calculate([
    new StockEntry(1, 'in', 6),
    new StockEntry(1, 'out', 2),
    new StockEntry(1, 'in', 2)
  ])
  expect(total).toBe(6)
})

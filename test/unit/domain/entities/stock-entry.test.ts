import StockEntry from '../../../../src/domain/entities/stock-entry'

test('Should create a stock entry', () => {
  const stockEntry = new StockEntry(1, 'in', 6, new Date('2020-01-01T10:00:00'))
  expect(stockEntry.idItem).toBe(1)
  expect(stockEntry.operation).toBe('in')
  expect(stockEntry.quantity).toBe(6)
  expect(stockEntry.date).toEqual(new Date('2020-01-01T10:00:00'))
})

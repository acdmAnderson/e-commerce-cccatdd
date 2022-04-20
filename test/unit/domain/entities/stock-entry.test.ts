import StockEntry from '../../../../src/domain/entities/stock-entry'

test('Should create a stock entry', () => {
  const stockEntry = new StockEntry(1, 'in', 6, new Date('2020-01-01T10:00:00'))
  expect(stockEntry.idItem).toBe(1)
  expect(stockEntry.operation).toBe('in')
  expect(stockEntry.quantity).toBe(6)
  expect(stockEntry.date).toEqual(new Date('2020-01-01T10:00:00'))
})

test('Should create a stock out', () => {
  const stockEntry = new StockEntry(1, 'out', 2, new Date('2020-01-01T10:00:00'))
  expect(stockEntry.idItem).toBe(1)
  expect(stockEntry.operation).toBe('out')
  expect(stockEntry.quantity).toBe(2)
  expect(stockEntry.date).toEqual(new Date('2020-01-01T10:00:00'))
})

test('Shoudn\'t create a StockEntry with a unexpected operation', () => {
  expect(() => new StockEntry(1, 'wrong_operation', 6, new Date('2020-01-01T10:00:00'))).toThrow(new Error('Operation not exists'))
})

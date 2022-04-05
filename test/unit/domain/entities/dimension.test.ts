import Dimension from '../../../../src/domain/entities/dimension'

test('Should calculate volume', () => {
  const fakeDimension = new Dimension(20, 15, 10)
  const volume = fakeDimension.getVolume()
  expect(volume).toBe(0.003)
})

test('Should throw if height is negative', () => {
  expect(() => new Dimension(-20, 15, 10)).toThrow(new Error('Height cannot be negative'))
})

test('Should throw if width is negative', () => {
  expect(() => new Dimension(20, -15, 10)).toThrow(new Error('Width cannot be negative'))
})

test('Should throw if depth is negative', () => {
  expect(() => new Dimension(20, 15, -10)).toThrow(new Error('Depth cannot be negative'))
})

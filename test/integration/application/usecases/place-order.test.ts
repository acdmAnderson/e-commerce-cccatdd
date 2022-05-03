import PlaceOrder from '../../../../src/application/usecases/place-order/place-order'
import PlaceOrderInput from '../../../../src/application/usecases/place-order/place-order.input'
import MemoryRepositoryFactory from '../../../../src/infra/factories/memory-repository-factory'

test('Should place an order', async () => {
  const placeOrder = new PlaceOrder(new MemoryRepositoryFactory())
  const input = new PlaceOrderInput('11144477735', [
    { idItem: 1, quantity: 1 },
    { idItem: 2, quantity: 3 },
    { idItem: 3, quantity: 1 }
  ], new Date('2019-01-01T10:00:00'), 'VALE20')
  const output = await placeOrder.execute(input)
  expect(output.total).toBe(200)
})

test('Should place an order and your code', async () => {
  const placeOrder = new PlaceOrder(new MemoryRepositoryFactory())
  const input = new PlaceOrderInput(
    '11144477735',
    [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 3 },
      { idItem: 3, quantity: 1 }
    ],
    new Date('2021-01-01T10:00:00'),
    'VALE20'
  )
  await placeOrder.execute(input)
  const output = await placeOrder.execute(input)
  expect(output.code).toBe('202100000002')
})

test('Should place an order without coupon', async () => {
  const placeOrder = new PlaceOrder(new MemoryRepositoryFactory())
  const input = new PlaceOrderInput('11144477735', [
    { idItem: 1, quantity: 1 },
    { idItem: 2, quantity: 3 },
    { idItem: 3, quantity: 1 }
  ])
  const output = await placeOrder.execute(input)
  expect(output.total).toBe(250)
})

test('Should place an order with nonexistent coupon code', async () => {
  const placeOrder = new PlaceOrder(new MemoryRepositoryFactory())
  const nonexistentCode = 'nonexistent_code'
  const input = new PlaceOrderInput(
    '11144477735',
    [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 3 },
      { idItem: 3, quantity: 1 }
    ],
    new Date('2021-01-01T10:00:00'),
    nonexistentCode
  )
  const output = await placeOrder.execute(input)
  expect(output.total).toBe(250)
  expect(output.code).toBe('202100000001')
})

test('Should throw if item not exists', () => {
  const placeOrder = new PlaceOrder(new MemoryRepositoryFactory())
  const input = new PlaceOrderInput('11144477735', [
    { idItem: -999, quantity: 3 }
  ])
  const output = placeOrder.execute(input)
  expect(output).rejects.toThrow(new Error('Item not found'))
})

test('Should throw if item quantity is negative', () => {
  const placeOrder = new PlaceOrder(new MemoryRepositoryFactory())
  const input = new PlaceOrderInput('11144477735', [
    { idItem: 1, quantity: -3 }
  ])
  const output = placeOrder.execute(input)
  expect(output).rejects.toThrow(new Error('Quantity should be positive'))
})

test('Should throw if order has same items', () => {
  const placeOrder = new PlaceOrder(new MemoryRepositoryFactory())
  const input = new PlaceOrderInput('11144477735', [
    { idItem: 1, quantity: 1 },
    { idItem: 3, quantity: 1 },
    { idItem: 2, quantity: 1 },
    { idItem: 2, quantity: 1 }
  ])
  const output = placeOrder.execute(input)
  expect(output).rejects.toThrow(new Error('Items cannot be duplicated'))
})

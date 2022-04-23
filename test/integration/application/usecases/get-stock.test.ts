import GetStock from '../../../../src/application/usecases/get-stock/get-stock'
import PlaceOrder from '../../../../src/application/usecases/place-order/place-order'
import PlaceOrderInput from '../../../../src/application/usecases/place-order/place-order.input'
import DatabaseRepositoryFactory from '../../../../src/infra/factories/database-repository-factory'
import PostgresConnection from '../../../util/postgres-connection'

const connection = PostgresConnection.getInstance()
const repositoryFactory = new DatabaseRepositoryFactory(connection)

beforeAll(async () => await connection.connect())

const makeOrderInput = (): PlaceOrderInput => {
  return new PlaceOrderInput('11144477735', [
    { idItem: 1, quantity: 1 },
    { idItem: 2, quantity: 1 },
    { idItem: 3, quantity: 3 }
  ], new Date('2021-10-10T10:00:00'), 'VALE20')
}

const makePlaceOrder = (): PlaceOrder => {
  return new PlaceOrder(repositoryFactory)
}

test('Should return current stock', async () => {
  const orderRepository = repositoryFactory.createOrderRepository()
  const getStock = new GetStock(repositoryFactory)
  const placeOrder = makePlaceOrder()
  const orderInput = makeOrderInput()
  await orderRepository.clean()
  await placeOrder.execute(orderInput)
  const totalItem1 = await getStock.execute(1)
  const totalItem2 = await getStock.execute(2)
  const totalItem3 = await getStock.execute(3)
  expect(totalItem1).toBe(-1)
  expect(totalItem2).toBe(-1)
  expect(totalItem3).toBe(-3)
})

afterAll(async () => await connection.close())

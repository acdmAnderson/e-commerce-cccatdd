import FreightSimulate from '../../../../src/application/usecases/freight-simulate/freight-simulate'
import FreightSimulateInput from '../../../../src/application/usecases/freight-simulate/freight-simulate.input'
import Dimension from '../../../../src/domain/entities/dimension'
import Item from '../../../../src/domain/entities/item'
import RepositoryFactory from '../../../../src/domain/factories/repository-factory'
import CouponRepository from '../../../../src/domain/repositories/coupon.repository'
import ItemRepository from '../../../../src/domain/repositories/item.repository'
import OrderRepository from '../../../../src/domain/repositories/order.repository'

const makeFakeItemRepository = (): ItemRepository => {
  class FakeItemRepository implements ItemRepository {
        readonly items: Item[];
        constructor () {
          const dimension = new Dimension(20, 15, 10)
          this.items = [
            new Item(1, 'any_category', 'any_description', 50, dimension, 1)
          ]
        }

        async getById (id: number): Promise<Item | undefined> {
          return this.items.find(item => item.idItem === id)
        }
  }
  return new FakeItemRepository()
}

const makeFakeRepositoryFactory = (): RepositoryFactory => {
  class FakeRepositoryFactory implements RepositoryFactory {
    createCouponRepository (): CouponRepository {
      throw new Error()
    }

    createItemRepository (): ItemRepository {
      return makeFakeItemRepository()
    }

    createOrderRepository (): OrderRepository {
      throw new Error()
    }
  }

  return new FakeRepositoryFactory()
}

test('Should simulate freight', async () => {
  const freightSimulate = new FreightSimulate(makeFakeRepositoryFactory())
  const freightSimulateInput = new FreightSimulateInput([{ idItem: 1, quantity: 3 }])
  const output = await freightSimulate.execute(freightSimulateInput)
  expect(output.value).toBe(30)
})

test('Should throw if freight throws', () => {
  const freightSimulate = new FreightSimulate(makeFakeRepositoryFactory())
  const freightSimulateInput = new FreightSimulateInput([{ idItem: 2, quantity: 3 }])
  const output = freightSimulate.execute(freightSimulateInput)
  expect(output).rejects.toThrow(new Error('Item not found'))
})

import RepositoryFactory from '../../domain/factories/repository-factory'
import CouponRepository from '../../domain/repositories/coupon.repository'
import ItemRepository from '../../domain/repositories/item.repository'
import OrderRepository from '../../domain/repositories/order.repository'
import StockEntryRepository from '../../domain/repositories/stock-entry.repository'
import CouponRepositoryMemory from '../repositories/memory/coupon-repository-memory'

export default class MemoryRepositoryFactory implements RepositoryFactory {
  createCouponRepository (): CouponRepository {
    return new CouponRepositoryMemory()
  }

  createItemRepository (): ItemRepository {
    throw new Error('Method not implemented.')
  }

  createOrderRepository (): OrderRepository {
    throw new Error('Method not implemented.')
  }

  createStockEntryRepository (): StockEntryRepository {
    throw new Error('Method not implemented.')
  }
}

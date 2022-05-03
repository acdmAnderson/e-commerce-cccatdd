import RepositoryFactory from '../../domain/factories/repository-factory'
import CouponRepository from '../../domain/repositories/coupon.repository'
import ItemRepository from '../../domain/repositories/item.repository'
import OrderRepository from '../../domain/repositories/order.repository'
import StockEntryRepository from '../../domain/repositories/stock-entry.repository'
import CouponRepositoryMemory from '../repositories/memory/coupon-repository-memory'
import ItemRepositoryMemory from '../repositories/memory/item-repository-memory'
import OrderRepositoryMemory from '../repositories/memory/order-repository-memory'
import StockEntryRepositoryMemory from '../repositories/memory/stock-entry-repository-memory'

export default class MemoryRepositoryFactory implements RepositoryFactory {
  createCouponRepository (): CouponRepository {
    return new CouponRepositoryMemory()
  }

  createItemRepository (): ItemRepository {
    return new ItemRepositoryMemory()
  }

  createOrderRepository (): OrderRepository {
    return new OrderRepositoryMemory()
  }

  createStockEntryRepository (): StockEntryRepository {
    return new StockEntryRepositoryMemory()
  }
}

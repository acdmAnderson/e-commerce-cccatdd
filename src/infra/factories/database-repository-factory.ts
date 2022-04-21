import RepositoryFactory from '../../domain/factories/repository-factory'
import CouponRepository from '../../domain/repositories/coupon.repository'
import ItemRepository from '../../domain/repositories/item.repository'
import OrderRepository from '../../domain/repositories/order.repository'
import StockEntryRepository from '../../domain/repositories/stock-entry.repository'
import Connection from '../database/connection'
import CouponRepositoryDatabase from '../repositories/database/coupon-repository-database'
import ItemRepositoryDatabase from '../repositories/database/item-repository-database'
import OrderRepositoryDatabase from '../repositories/database/order-repository-database'
import StockEntryRepositoryDatabase from '../repositories/database/stock-entry-repository-database'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor (private readonly connection: Connection) { }

  createCouponRepository (): CouponRepository {
    return new CouponRepositoryDatabase(this.connection)
  }

  createItemRepository (): ItemRepository {
    return new ItemRepositoryDatabase(this.connection)
  }

  createOrderRepository (): OrderRepository {
    return new OrderRepositoryDatabase(this.connection)
  }

  createStockEntryRepository (): StockEntryRepository {
    return new StockEntryRepositoryDatabase(this.connection)
  }
}

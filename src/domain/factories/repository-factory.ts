import CouponRepository from '../repositories/coupon.repository'
import ItemRepository from '../repositories/item.repository'
import OrderRepository from '../repositories/order.repository'
import StockEntryRepository from '../repositories/stock-entry.repository'

export default interface RepositoryFactory {
    createCouponRepository (): CouponRepository

    createItemRepository (): ItemRepository

    createOrderRepository (): OrderRepository

    createStockEntryRepository (): StockEntryRepository
}

import CouponRepository from '../../../domain/repositories/coupon.repository'
import ItemRepository from '../../../domain/repositories/item.repository'
import Order from '../../../domain/entities/order'
import OrderRepository from '../../../domain/repositories/order.repository'
import PlaceOrderInput from './place-order.input'
import PlaceOrderOutput from './place-order.output'
import RepositoryFactory from '../../../domain/factories/repository-factory'
import StockEntryRepository from '../../../domain/repositories/stock-entry.repository'
import StockEntry from '../../../domain/entities/stock-entry'

export default class PlaceOrder {
    private readonly itemRepository: ItemRepository;
    private readonly couponRepository: CouponRepository;
    private readonly orderRepository: OrderRepository;
    private readonly stockEntryRepository: StockEntryRepository;

    constructor (repositoryFactory: RepositoryFactory) {
      this.itemRepository = repositoryFactory.createItemRepository()
      this.couponRepository = repositoryFactory.createCouponRepository()
      this.orderRepository = repositoryFactory.createOrderRepository()
      this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
    }

    async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
      if (input.items.some((item, index) => item.idItem === input.items[index + 1]?.idItem)) throw new Error('Items cannot be duplicated')
      const sequence = await this.orderRepository.count() + 1
      const order = new Order(input.cpf, input.issueDate, sequence)
      for (const { quantity, idItem } of input.items) {
        const item = await this.itemRepository.getById(idItem)
        if (!item) throw new Error('Item not found')
        order.addItem(item, quantity)
      }
      if (input.coupon) {
        const coupon = await this.couponRepository.getByCode(input.coupon)
        if (coupon) order.addCoupon(coupon)
      }
      await this.orderRepository.save(order)
      for (const { quantity, idItem } of input.items) {
        await this.stockEntryRepository.save(new StockEntry(idItem, 'out', quantity))
      }
      return new PlaceOrderOutput(order.getCode(), order.getTotal())
    }
}

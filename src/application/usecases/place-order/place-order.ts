import CouponRepository from '../../../domain/repositories/coupon.repository';
import ItemRepository from '../../../domain/repositories/item.repository';
import Order from '../../../domain/entities/order';
import OrderRepository from '../../../domain/repositories/order.repository';
import PlaceOrderInput from './place-order.input';
import PlaceOrderOutput from './place-order.output';

export default class PlaceOrder {

    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly couponRepository: CouponRepository,
        private readonly orderRepository: OrderRepository
    ) { }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        for (const { quantity, idItem } of input.items) {
            const item = await this.itemRepository.getById(idItem);
            if (!item) throw new Error('Item not found')
            order.addItem(item, quantity);
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        await this.orderRepository.save(order);
        return new PlaceOrderOutput(order.getCode(), order.getTotal())
    }
}
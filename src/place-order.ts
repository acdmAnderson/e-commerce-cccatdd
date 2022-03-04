import CouponRepository from './coupon.repository';
import ItemRepository from './item.repository';
import Order from './order';
import OrderRepository from './order.repository';
import PlaceOrderInput from './place-order.input';
import PlaceOrderOutput from './place-order.output';

export default class PlaceOrder {

    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly couponRepository: CouponRepository,
        private readonly orderRepository: OrderRepository
    ) { }

    execute(input: PlaceOrderInput): PlaceOrderOutput {
        const order = new Order(input.cpf);
        for (const { quantity, idItem } of input.items) {
            const item = this.itemRepository.getById(idItem);
            if (!item) throw new Error('Item not found')
            order.addItem(item, quantity);
        }
        if (input.coupon) {
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        this.orderRepository.save(order);
        return new PlaceOrderOutput(order.getTotal())
    }
}
import PlaceOrder from '../src/place-order';
import PlaceOrderInput from '../src/place-order.input';
import CouponRepository from '../src/coupon.repository'
import OrderRepository from '../src/order.repository'
import ItemRepository from '../src/item.repository'
import coupon from '../src/coupon';
import item from '../src/item';
import Item from '../src/item';
import order from '../src/order';
import Order from '../src/order';
import Coupon from '../src/coupon';

const makeFakeItemRepository = (): ItemRepository => {
    class FakeItemRepository implements ItemRepository {
        readonly items: Item[];

        constructor() {
            this.items = [
                new Item(1, 'any_category', 'any_description', 50),
                new Item(2, 'any_category', 'any_description', 50),
                new Item(3, 'any_category', 'any_description', 50),
            ]
        }
        getById(id: number): item | undefined {
            return this.items.find(item => item.idItem === id);
        }
    }
    return new FakeItemRepository();
}

const makeFakeOrderRepository = (): OrderRepository => {
    class FakeOrderRepository implements OrderRepository {

        readonly orders: Order[];

        constructor() {
            this.orders = []
        }

        save(order: order): void {
            this.orders.push(order)
        }
    }
    return new FakeOrderRepository();
}

const makeFakeCouponRepository = (): CouponRepository => {
    class FakeCouponRepository implements CouponRepository {
        readonly coupons: Coupon[];

        constructor() {
            this.coupons = [
                new Coupon('VALE20', 20)
            ]
        }
        getByCode(code: string): coupon | undefined {
            return this.coupons.find(coupon => coupon.code === code);
        }
    }
    return new FakeCouponRepository();
}


test('Should place an order', () => {
    const placeOrder = new PlaceOrder(makeFakeItemRepository(), makeFakeCouponRepository(), makeFakeOrderRepository());
    const input = new PlaceOrderInput('11144477735', [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 3 },
        { idItem: 3, quantity: 1 }
    ], 'VALE20')
    const output = placeOrder.execute(input);
    expect(output.total).toBe(200)
})
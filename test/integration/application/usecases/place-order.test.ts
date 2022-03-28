import PlaceOrder from '../../../../src/application/usecases/place-order/place-order';
import PlaceOrderInput from '../../../../src/application/usecases/place-order/place-order.input';
import CouponRepository from '../../../../src/domain/repositories/coupon.repository'
import OrderRepository from '../../../../src/domain/repositories/order.repository'
import ItemRepository from '../../../../src/domain/repositories/item.repository'
import Item from '../../../../src/domain/entities/item';
import order from '../../../../src/domain/entities/order';
import Order from '../../../../src/domain/entities/order';
import Coupon from '../../../../src/domain/entities/coupon';

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
        async getById(id: number): Promise<Item | undefined> {
            return this.items.find(item => item.idItem === id);
        }
    }
    return new FakeItemRepository();
}

const makeFakeOrderRepository = (): OrderRepository => {
    class FakeOrderRepository implements OrderRepository {

        private orders: Order[];

        constructor() {
            this.orders = []
        }

        async getAll(): Promise<Order[]> {
            return this.orders;
        }

        async getByCode(code: string): Promise<Order | undefined> {
            return this.orders.find((order) => order.getCode() === code);
        }

        async clean(): Promise<void> {
            this.orders = [];
        }

        async count(): Promise<number> {
            return this.orders.length;
        }

        async save(order: order): Promise<void> {
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
        async getByCode(code: string): Promise<Coupon | undefined> {
            return this.coupons.find(coupon => coupon.code === code);
        }
    }
    return new FakeCouponRepository();
}


test('Should place an order', async () => {
    const placeOrder = new PlaceOrder(makeFakeItemRepository(), makeFakeCouponRepository(), makeFakeOrderRepository());
    const input = new PlaceOrderInput('11144477735', [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 3 },
        { idItem: 3, quantity: 1 }
    ], new Date(), 'VALE20')
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(200)
})

test('Should place an order and your code', async () => {
    const placeOrder = new PlaceOrder(makeFakeItemRepository(), makeFakeCouponRepository(), makeFakeOrderRepository());
    const input = new PlaceOrderInput(
        '11144477735',
        [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 3 },
            { idItem: 3, quantity: 1 }
        ],
        new Date('2021-01-01T10:00:00'),
        'VALE20'
    )
    await placeOrder.execute(input);
    const output = await placeOrder.execute(input);
    expect(output.code).toBe('202100000002')
})

test('Should place an order without coupon', async () => {
    const placeOrder = new PlaceOrder(makeFakeItemRepository(), makeFakeCouponRepository(), makeFakeOrderRepository());
    const input = new PlaceOrderInput('11144477735', [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 3 },
        { idItem: 3, quantity: 1 }
    ])
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(250)
})

test('Should place an order with nonexistent coupon code', async () => {
    const placeOrder = new PlaceOrder(makeFakeItemRepository(), makeFakeCouponRepository(), makeFakeOrderRepository());
    const nonexistentCode = 'nonexistent_code';
    const input = new PlaceOrderInput(
        '11144477735',
        [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 3 },
            { idItem: 3, quantity: 1 }
        ],
        new Date('2021-01-01T10:00:00'),
        nonexistentCode
    )
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(250)
    expect(output.code).toBe('202100000001')
})

test('Should throw if item not exists', () => {
    const placeOrder = new PlaceOrder(makeFakeItemRepository(), makeFakeCouponRepository(), makeFakeOrderRepository());
    const input = new PlaceOrderInput('11144477735', [
        { idItem: -999, quantity: 3 },
    ])
    const output = placeOrder.execute(input);
    expect(output).rejects.toThrow(new Error('Item not found'))
})



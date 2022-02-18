import Coupon from '../src/coupon';
import CPFError from '../src/errors/cpf.error';
import Item from '../src/item'
import Order from '../src/order'

const makeFakeOrder = (coupon: Coupon | undefined = undefined): Order => {
    const fakeOrder = new Order('11144477735', coupon);
    fakeOrder.addItem(new Item(1, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(2, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(3, 'any_category', 'any_description', 50), 1);
    return fakeOrder;
}

const makeExpiredCoupon = () => {
    return makeCoupon(-1);
}

const makeCoupon = (addedHour: number) => {
    const date = new Date();
    date.setHours(date.getHours() + addedHour);
    return new Coupon('any_name', 5, date);
}

const makeValidCoupon = () => {
    return makeCoupon(1);
}

test("Shouldn't make an order with invalid CPF", () => {
    const invalidCPF = 'invalid_cpf';
    expect(() => new Order(invalidCPF)).toThrow(new CPFError(invalidCPF))
})

test("Should make an order with 3 items", () => {
    const fakeOrder = makeFakeOrder();
    expect(fakeOrder.orderItems.length).toBe(3)
    expect(fakeOrder.getTotal()).toBe(150);
})

test("Should make an order with coupon", () => {
    const fakeOrder = makeFakeOrder(makeValidCoupon());
    expect(fakeOrder.getTotal()).toBe(142.5)
})

test("Shouldn't apply expired coupon", () => {
    const fakeOrder = makeFakeOrder(makeExpiredCoupon())
    expect(fakeOrder.getTotal()).toBe(150)
})
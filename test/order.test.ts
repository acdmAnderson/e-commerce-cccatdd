import Coupon from '../src/coupon';
import Item from '../src/item'
import Order from '../src/order'

test("Shouldn't make an order with invalid CPF", () => {
    expect(() => new Order('invalid_cpf')).toThrow('Invalid CPF')
})

test("Should make an order with 3 items", () => {
    const fakeOrder = new Order('11144477735');
    fakeOrder.addItem(new Item(1, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(2, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(3, 'any_category', 'any_description', 50), 1);
    expect(fakeOrder.orderItems.length).toBe(3)
    expect(fakeOrder.getTotal()).toBe(150);
})

test("Should make an order with coupon", () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const fakeOrder = new Order('11144477735', new Coupon('any_name', 5, date));
    fakeOrder.addItem(new Item(1, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(2, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(3, 'any_category', 'any_description', 50), 1);
    expect(fakeOrder.getTotal()).toBe(142.5)
})

test("Shouldn't apply expired coupon", () => {
    const fakeOrder = new Order('11144477735', new Coupon('any_name', 5, new Date(2021, 3, 17, 23, 59, 59)));
    fakeOrder.addItem(new Item(1, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(2, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(3, 'any_category', 'any_description', 50), 1);
    expect(fakeOrder.getTotal()).toBe(150)
})
import Item from '../src/item'
import Order from '../src/order'
import OrderItem from '../src/order-item';

test("Shouldn't make an order with invalid CPF", () => {
    const fakeItem = new Item("any_description", 0);
    const fakeOrderItem = new OrderItem(fakeItem, 1);
    expect(() => new Order("invalid_cpf", [fakeOrderItem])).toThrow('Invalid CPF')
})

test("Should make an order with 3 items", () => {
    const orderItems = [
        new OrderItem(new Item('any_description', 50), 1),
        new OrderItem(new Item('any_description', 50), 1),
        new OrderItem(new Item('any_description', 50), 1)
    ]
    const fakeOrder = new Order('11144477735', orderItems);
    expect(fakeOrder.orderItems.length).toBe(3)
})
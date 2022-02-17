import Item from '../src/item'
import Order from '../src/order'

test("Shouldn't make an order with invalid CPF", () => {
    const fakeItem = new Item("any_description", 0);
    expect(() => new Order("invalid_cpf", [fakeItem], 0)).toThrow('Invalid CPF')
})
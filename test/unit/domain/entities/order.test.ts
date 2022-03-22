import Coupon from '../../../../src/domain/entities/coupon';
import Dimension from '../../../../src/domain/entities/dimension';
import CPFError from '../../../../src/errors/cpf.error';
import Item from '../../../../src/domain/entities/item'
import Order from '../../../../src/domain/entities/order'

const makeFakeOrder = (): Order => {
    const fakeOrder = new Order('11144477735');
    fakeOrder.addItem(new Item(1, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(2, 'any_category', 'any_description', 50), 1);
    fakeOrder.addItem(new Item(3, 'any_category', 'any_description', 50), 1);
    return fakeOrder;
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
    const fakeOrder = makeFakeOrder();
    fakeOrder.addCoupon(new Coupon('any_code', 5, new Date()))
    expect(fakeOrder.getTotal()).toBe(142.5)
})

test("Shouldn't apply expired coupon", () => {
    const fakeOrder = makeFakeOrder()
    fakeOrder.addCoupon(new Coupon('any_code', 5, new Date('2021-02-22T09:59:59')))
    expect(fakeOrder.getTotal()).toBe(150)
})

test('Should add freight value at total order', () => {
    const fakeOrder = new Order('11144477735');
    const fakeDimension = new Dimension(100, 30, 10);
    fakeOrder.addItem(new Item(1, 'any_category', 'any_description', 50, fakeDimension, 3), 1);
    const total = fakeOrder.getTotal();
    expect(total).toBe(80)
})

test("Should make an order and generate order code", () => {
    const fakeIssueDate = new Date('2021-02-22T10:00:00');
    const fakeSequence = 1;
    const fakeOrder = new Order('11144477735', fakeIssueDate, fakeSequence);
    fakeOrder.addItem(new Item(1, 'any_category', 'any_description', 50), 1);
    expect(fakeOrder.getCode()).toBe('202100000001');
})
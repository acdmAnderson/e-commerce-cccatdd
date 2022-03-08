import Dimension from '../../src/domain/entities/dimension';
import Freight from '../../src/domain/entities/freight';
import Item from '../../src/domain/entities/item';

test('Should calculate freight value', () => {
    const fakeFreight = new Freight();
    const fakeDimension = new Dimension(20, 15, 10)
    const fakeItem = new Item(1, 'any_category', 'any_description', 50, fakeDimension, 1);
    fakeFreight.addItem(fakeItem, 3)
    const value = fakeFreight.getValue();
    expect(value).toBe(30)
})

test(`Shouldn’t calculate freight value if dimension and weight not exists`, () => {
    const fakeFreight = new Freight();
    const fakeItem = new Item(1, 'any_category', 'any_description', 50);
    fakeFreight.addItem(fakeItem, 1)
    const value = fakeFreight.getValue();
    expect(value).toBe(0)
})

test('Should calculate min freight value', () => {
    const fakeFreight = new Freight();
    const fakeDimension = new Dimension(20, 15, 10)
    const fakeItem = new Item(1, 'any_category', 'any_description', 50, fakeDimension, 0.9);
    fakeFreight.addItem(fakeItem, 1)
    const value = fakeFreight.getValue();
    expect(value).toBe(10)
})
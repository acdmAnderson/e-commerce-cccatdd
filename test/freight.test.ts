import Dimension from '../src/dimension';
import Freight from '../src/freight';
import Item from '../src/item';

test('Should calculate freight value', () => {
    const fakeFreight = new Freight();
    const fakeDimension = new Dimension(20, 15, 10)
    const fakeItem = new Item(1, 'any_category', 'any_description', 50, fakeDimension, 1);
    fakeFreight.addItem(fakeItem)
    const value = fakeFreight.getValue();
    expect(value).toBe(10)
})

test(`Shouldn’t calculate freight value if dimension and weight not exists`, () => {
    const fakeFreight = new Freight();
    const fakeItem = new Item(1, 'any_category', 'any_description', 50);
    fakeFreight.addItem(fakeItem)
    const value = fakeFreight.getValue();
    expect(value).toBe(0)
})

test('Should calculate min freight value', () => {
    const fakeFreight = new Freight();
    const fakeDimension = new Dimension(20, 15, 10)
    const fakeItem = new Item(1, 'any_category', 'any_description', 50, fakeDimension, 0.9);
    fakeFreight.addItem(fakeItem)
    const value = fakeFreight.getValue();
    expect(value).toBe(10)
})
import Item from '../src/item';
import Dimension from '../src/dimension'

test('Should calculate density', () => {
    const fakeDimension = new Dimension(20, 15, 10)
    const fakeItem = new Item(1, 'any_category', 'any_description', 50, fakeDimension, 1);
    const density = fakeItem.getDensity();
    expect(density).toBe(333)
})

test(`Shouldn’t calculate density if dimension and weight not exists`, () => {
    const fakeItem = new Item(1, 'any_category', 'any_description', 50);
    const density = fakeItem.getDensity();
    expect(density).toBe(0)
})
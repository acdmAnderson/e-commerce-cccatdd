import Item from '../../src/domain/entities/item';
import Dimension from '../../src/domain/entities/dimension'

test('Should calculate density', () => {
    const fakeDimension = new Dimension(100, 30, 10);
    const fakeItem = new Item(1, 'any_category', 'any_description', 50, fakeDimension, 3);
    const density = fakeItem.getDensity();
    expect(density).toBe(100)
})

test(`Shouldn’t calculate density if dimension and weight not exists`, () => {
    const fakeItem = new Item(1, 'any_category', 'any_description', 50);
    const density = fakeItem.getDensity();
    expect(density).toBe(0)
})
import Dimension from '../src/dimension';

test('Should calculate volume', () => {
    const fakeDimension = new Dimension(20, 15, 10);
    const volume = fakeDimension.getVolume();
    expect(volume).toBe(0.003);
})
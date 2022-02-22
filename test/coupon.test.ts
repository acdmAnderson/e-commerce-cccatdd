import Coupon from '../src/coupon'

test('Should return true if coupon is not expired', () => {
    const fakeCoupon = new Coupon('any_code', 5, new Date('2023-02-22T23:59:59'))
    const isExpired = fakeCoupon.isExpired(new Date('2021-02-22T23:59:59'))
    expect(isExpired).toBe(true);
})
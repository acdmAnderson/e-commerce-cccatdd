import Coupon from '../../../../src/domain/entities/coupon'

test('Should return false if coupon is not expired', () => {
    const fakeCoupon = new Coupon('any_code', 5)
    const isExpired = fakeCoupon.isExpired()
    expect(isExpired).toBe(false);
})

test('Should return true if coupon is expired', () => {
    const fakeCoupon = new Coupon('any_code', 5, new Date('2020-02-22T23:59:59'))
    const isExpired = fakeCoupon.isExpired(new Date('2023-02-22T23:59:59'));
    expect(isExpired).toBe(true);
})

test('Should calculate coupon discount', () => {
    const fakeCoupon = new Coupon('any_code', 20)
    const discount = fakeCoupon.calculateDiscount(1000);
    expect(discount).toBe(200);
})
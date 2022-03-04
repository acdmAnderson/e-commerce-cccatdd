import Coupon from './coupon';

export default interface CouponRepository {
    getByCode(code: string): Coupon | undefined
}
import Coupon from '../entities/coupon';

export default interface CouponRepository {
    getByCode(code: string): Coupon | undefined
}
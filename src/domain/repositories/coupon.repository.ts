import Coupon from '../entities/coupon';

export default interface CouponRepository {
    getByCode(code: string): Promise<Coupon | undefined>;
}
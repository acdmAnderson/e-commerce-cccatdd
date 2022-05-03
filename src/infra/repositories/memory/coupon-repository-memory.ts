import Coupon from '../../../domain/entities/coupon'
import CouponRepository from '../../../domain/repositories/coupon.repository'

export default class CouponRepositoryMemory implements CouponRepository {
    readonly coupons: Coupon[];

    constructor () {
      this.coupons = [
        new Coupon('VALE20', 20, new Date('2020-01-01T10:00:00'))
      ]
    }

    async getByCode (code: string): Promise<Coupon | undefined> {
      return this.coupons.find((coupon) => coupon.code === code)
    }
}

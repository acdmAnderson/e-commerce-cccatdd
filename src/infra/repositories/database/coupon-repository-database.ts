import Coupon from '../../../domain/entities/coupon'
import CouponRepository from '../../../domain/repositories/coupon.repository'
import Connection from '../../database/connection'

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor (private readonly connection: Connection) { }

  async getByCode (code: string): Promise<Coupon | undefined> {
    const result = await this.connection.query('SELECT * FROM ccca.coupon c where c.code = $1;', [code])
    const [couponData] = result.rows
    return new Coupon(couponData.code, couponData.percentage, couponData.expire_date)
  }
}

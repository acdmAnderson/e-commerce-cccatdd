/* eslint-disable no-undef */
import CouponValidation from '../../../../src/application/usecases/coupon-validation/coupon-validation'
import CouponValidationInput from '../../../../src/application/usecases/coupon-validation/coupon-validation.input'
import Coupon from '../../../../src/domain/entities/coupon'
import RepositoryFactory from '../../../../src/domain/factories/repository-factory'
import CouponRepository from '../../../../src/domain/repositories/coupon.repository'
import ItemRepository from '../../../../src/domain/repositories/item.repository'
import OrderRepository from '../../../../src/domain/repositories/order.repository'

const makeFakeCouponRepository = (): CouponRepository => {
  class FakeCouponRepository implements CouponRepository {
        readonly coupons: Coupon[];

        constructor () {
          this.coupons = [
            new Coupon('VALE20', 20, new Date('2020-01-01T10:00:00'))
          ]
        }

        async getByCode (code: string): Promise<Coupon | undefined> {
          return this.coupons.find(coupon => coupon.code === code)
        }
  }
  return new FakeCouponRepository()
}

const makeFakeRepositoryFactory = (): RepositoryFactory => {
  class FakeRepositoryFactory implements RepositoryFactory {
    createCouponRepository (): CouponRepository {
      return makeFakeCouponRepository()
    }

    createItemRepository (): ItemRepository {
      throw new Error()
    }

    createOrderRepository (): OrderRepository {
      throw new Error()
    }
  }

  return new FakeRepositoryFactory()
}

test('Should validate coupon', async () => {
  const couponValidation = new CouponValidation(makeFakeRepositoryFactory())
  const input = new CouponValidationInput('VALE20')
  const output = await couponValidation.execute(input)
  expect(output.isValid).toBeTruthy()
})

test('Should return invalid if coupon code not exists', async () => {
  const couponValidation = new CouponValidation(makeFakeRepositoryFactory())
  const nonexistentCode = 'nonexistent_code'
  const input = new CouponValidationInput(nonexistentCode)
  const output = await couponValidation.execute(input)
  expect(output.isValid).toBeFalsy()
})

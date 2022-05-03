import CouponValidation from '../../../../src/application/usecases/coupon-validation/coupon-validation'
import CouponValidationInput from '../../../../src/application/usecases/coupon-validation/coupon-validation.input'
import MemoryRepositoryFactory from '../../../../src/infra/factories/memory-repository-factory'

test('Should validate coupon', async () => {
  const couponValidation = new CouponValidation(new MemoryRepositoryFactory())
  const input = new CouponValidationInput('VALE20')
  const output = await couponValidation.execute(input)
  expect(output.isValid).toBeTruthy()
})

test('Should return invalid if coupon code not exists', async () => {
  const couponValidation = new CouponValidation(new MemoryRepositoryFactory())
  const nonexistentCode = 'nonexistent_code'
  const input = new CouponValidationInput(nonexistentCode)
  const output = await couponValidation.execute(input)
  expect(output.isValid).toBeFalsy()
})

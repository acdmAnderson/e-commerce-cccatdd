import CouponValidation from '../../../../src/application/usecases/coupon-validation/coupon-validation'
import CouponValidationInput from '../../../../src/application/usecases/coupon-validation/coupon-validation.input';
import Coupon from '../../../../src/domain/entities/coupon';
import CouponRepository from '../../../../src/domain/repositories/coupon.repository';

const makeFakeCouponRepository = (): CouponRepository => {
    class FakeCouponRepository implements CouponRepository {
        readonly coupons: Coupon[];

        constructor() {
            this.coupons = [
                new Coupon('VALE20', 20, new Date('2020-01-01T10:00:00'))
            ]
        }

        async getByCode(code: string): Promise<Coupon | undefined> {
            return this.coupons.find(coupon => coupon.code === code);
        }
    }
    return new FakeCouponRepository();
}

test('Should validate coupon', async () => {
    const couponValidation = new CouponValidation(makeFakeCouponRepository());
    const input = new CouponValidationInput('VALE20');
    const output = await couponValidation.execute(input);
    expect(output.isValid).toBeTruthy()
})


test('Should return invalid if coupon code not exists', async () => {
    const couponValidation = new CouponValidation(makeFakeCouponRepository());
    const nonexistentCode = 'nonexistent_code'
    const input = new CouponValidationInput(nonexistentCode);
    const output = await couponValidation.execute(input);
    expect(output.isValid).toBeFalsy()
})
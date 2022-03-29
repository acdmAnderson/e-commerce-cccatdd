import RepositoryFactory from '../../../domain/factories/repository-factory';
import CouponRepository from '../../../domain/repositories/coupon.repository';
import CouponValidationInput from './coupon-validation.input';
import CouponValidationOutput from './coupon-validation.output'

export default class CouponValidation {

    private readonly couponRepository: CouponRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.couponRepository = repositoryFactory.createCouponRepository();
    }

    async execute(input: CouponValidationInput): Promise<CouponValidationOutput> {
        const coupon = await this.couponRepository.getByCode(input.code);
        if (!coupon) return new CouponValidationOutput(false);
        return new CouponValidationOutput(coupon.isExpired(input.currentDate));
    }
}
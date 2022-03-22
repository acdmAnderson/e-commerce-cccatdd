import PostgreSQLConnectionAdapter from '../../../../../src/infra/database/postgres-connection';
import CouponRepositoryDatabase from '../../../../../src/infra/repositories/database/coupon-repository-database';

const connection = new PostgreSQLConnectionAdapter();

beforeEach(async () => await connection.connect());

test('Should test coupon repository', async () => {
    const couponRepository = new CouponRepositoryDatabase(connection);
    const coupon = await couponRepository.getByCode('VALE20');
    expect(coupon?.isExpired(new Date('2020-01-01T10:00:00'))).toBeFalsy()
})

afterEach(async () => await connection.close())
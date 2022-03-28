import PostgreSQLConnectionAdapter from '../../../../../src/infra/database/postgres-connection';
import CouponRepositoryDatabase from '../../../../../src/infra/repositories/database/coupon-repository-database';
import PostgresConnection from '../../../../util/postgres-connection';

const connection = PostgresConnection.getInstance();

beforeAll(async () => await connection.connect());

test('Should test coupon repository', async () => {
    const couponRepository = new CouponRepositoryDatabase(connection);
    const coupon = await couponRepository.getByCode('VALE20');
    expect(coupon?.isExpired(new Date('2020-01-01T10:00:00'))).toBeFalsy()
})

afterAll(async () => await connection.close())
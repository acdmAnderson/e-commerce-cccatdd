import GetOrder from '../../../../src/application/usecases/get-order/get-order';
import PlaceOrder from '../../../../src/application/usecases/place-order/place-order';
import PlaceOrderInput from '../../../../src/application/usecases/place-order/place-order.input';
import PostgreSQLConnectionAdapter from '../../../../src/infra/database/postgres-connection';
import CouponRepositoryDatabase from '../../../../src/infra/repositories/database/coupon-repository-database';
import ItemRepositoryDatabase from '../../../../src/infra/repositories/database/item-repository-database';
import OrderRepositoryDatabase from '../../../../src/infra/repositories/database/order-repository-database';
import PostgresConnection from '../../../util/postgres-connection';

const connection = PostgresConnection.getInstance();

beforeAll(async () => {
    await connection.connect();
})

test('Should return an order by code', async () => {
    const orderRepository = new OrderRepositoryDatabase(connection);
    await orderRepository.clean();
    const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(connection), new CouponRepositoryDatabase(connection), orderRepository);
    const orderInput = new PlaceOrderInput('11144477735', [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
    ], new Date('2021-10-10T10:00:00'), 'VALE20');
    await placeOrder.execute(orderInput);
    await placeOrder.execute(orderInput);
    const getOrder = new GetOrder(orderRepository);
    const input = {
        code: '202100000002'
    }
    const output = await getOrder.execute(input);
    expect(output.total).toBe(5152)
})

test('Should throw when order not exists', async () => {
    const orderRepository = new OrderRepositoryDatabase(connection);
    await orderRepository.clean();
    const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(connection), new CouponRepositoryDatabase(connection), orderRepository);
    const orderInput = new PlaceOrderInput('11144477735', [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
    ], new Date('2021-10-10T10:00:00'), 'VALE20');
    await placeOrder.execute(orderInput);
    const getOrder = new GetOrder(orderRepository);
    const input = {
        code: '202100000003'
    }
    const orderPromise = getOrder.execute(input);
    await expect(orderPromise).rejects.toThrow(new Error('Order not found'))
})

afterAll(async () => {
    await connection.close();
})
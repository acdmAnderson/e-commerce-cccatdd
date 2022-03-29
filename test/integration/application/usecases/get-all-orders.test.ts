import GetAllOrders from '../../../../src/application/usecases/get-all-orders/get-all-orders';
import PlaceOrder from '../../../../src/application/usecases/place-order/place-order';
import PlaceOrderInput from '../../../../src/application/usecases/place-order/place-order.input';
import DatabaseRepositoryFactory from '../../../../src/infra/factories/database-repository-factory';
import CouponRepositoryDatabase from '../../../../src/infra/repositories/database/coupon-repository-database';
import ItemRepositoryDatabase from '../../../../src/infra/repositories/database/item-repository-database';
import OrderRepositoryDatabase from '../../../../src/infra/repositories/database/order-repository-database';
import PostgresConnection from '../../../util/postgres-connection';

const connection = PostgresConnection.getInstance();
const orderRepository = new OrderRepositoryDatabase(connection);

beforeEach(async () => {
    await orderRepository.clean();
})

beforeAll(async () => {
    await connection.connect();
})

const makeOrderInput = (): PlaceOrderInput => {
    return new PlaceOrderInput('11144477735', [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
    ], new Date('2021-10-10T10:00:00'), 'VALE20');
}

const makePlaceOrder = (): PlaceOrder => {
    return new PlaceOrder(new DatabaseRepositoryFactory(connection));
}

test('Should return all orders', async () => {
    const placeOrder = makePlaceOrder();
    const orderInput = makeOrderInput();
    await placeOrder.execute(orderInput);
    await placeOrder.execute(orderInput);
    await placeOrder.execute(orderInput);
    const getAllOrders = new GetAllOrders(orderRepository);
    const output = await getAllOrders.execute();
    expect(output.length).toBe(3);
})

afterAll(async () => {
    await connection.close();
})
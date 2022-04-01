import axios from 'axios';
import PlaceOrder from '../../../../src/application/usecases/place-order/place-order';
import PlaceOrderInput from '../../../../src/application/usecases/place-order/place-order.input';
import DatabaseRepositoryFactory from '../../../../src/infra/factories/database-repository-factory';
import PostgresConnection from '../../../util/postgres-connection';

const connection = PostgresConnection.getInstance();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const orderRepository = repositoryFactory.createOrderRepository();

beforeEach(async () => {
    await orderRepository.clean();
})

beforeAll(async () => await connection.connect());

test('Should create an order', async () => {
    const payload = new PlaceOrderInput('11144477735', [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
    ], new Date(), 'VALE20')
    const { data } = await axios.post('http://localhost:9001/orders', payload);
    expect(data.total).toBe(5152);
})

test('Should get an order', async () => {
    const placeOrder = new PlaceOrder(repositoryFactory);
    const input = new PlaceOrderInput('11144477735', [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
    ], new Date('2021-01-01T10:00:00'));
    await placeOrder.execute(input);
    const { data } = await axios.get('http://localhost:9001/orders/202100000001');
    expect(data.code).toBe('202100000001');
    expect(data.total).toBe(6370);
})

afterAll(async () => await connection.close());
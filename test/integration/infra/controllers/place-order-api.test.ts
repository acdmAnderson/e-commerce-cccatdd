import axios from 'axios';
import PlaceOrderInput from '../../../../src/application/usecases/place-order/place-order.input';
import PostgresConnection from '../../../util/postgres-connection';

const connection = PostgresConnection.getInstance();

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

afterAll(async () => await connection.close());
import Item from '../../../../../src/domain/entities/item';
import Order from '../../../../../src/domain/entities/order';
import PostgreSQLConnectionAdapter from '../../../../../src/infra/database/postgres-connection'
import OrderRepositoryDatabase from '../../../../../src/infra/repositories/database/order-repository-database';

const connection = new PostgreSQLConnectionAdapter();

beforeEach(async () => await connection.connect());

test('Should test order repository', async () => {
    const orderRepository = new OrderRepositoryDatabase(connection);
    const fakeIssueDate = new Date('2021-02-22T10:00:00');
    const fakeSequence = 1;
    const fakeOrder = new Order('11144477735', fakeIssueDate, fakeSequence);
    fakeOrder.addItem(new Item(1, 'Acessórios', 'Cabo', 30), 1);
    await orderRepository.clean();
    await orderRepository.save(fakeOrder);
    const count = await orderRepository.count();
    expect(count).toBe(1);
})

afterEach(async () => await connection.close());
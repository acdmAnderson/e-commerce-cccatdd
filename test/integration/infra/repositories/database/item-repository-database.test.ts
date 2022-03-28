import ItemRepositoryDatabase from '../../../../../src/infra/repositories/database/item-repository-database';
import PostgresConnection from '../../../../util/postgres-connection';

const connection = PostgresConnection.getInstance();

beforeAll(async () => await connection.connect())

test('Should test item repository', async () => {
    const itemRepository = new ItemRepositoryDatabase(connection);
    const item = await itemRepository.getById(1);
    expect(item?.description).toBe('Guitarra');
})

afterAll(async () => await connection.close())
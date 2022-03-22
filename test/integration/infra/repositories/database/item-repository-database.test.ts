import PostgreSQLConnectionAdapter from '../../../../../src/infra/database/postgres-connection'
import ItemRepositoryDatabase from '../../../../../src/infra/repositories/database/item-repository-database';

const connection = new PostgreSQLConnectionAdapter();

beforeEach(async () => await connection.connect())

test('Should test item repository', async () => {
    const itemRepository = new ItemRepositoryDatabase(connection);
    const item = await itemRepository.getById(1);
    expect(item?.description).toBe('Guitarra');
})

afterEach(async () => await connection.close())
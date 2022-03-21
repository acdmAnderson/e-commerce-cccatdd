import PostgreSQLConnectionAdapter from '../../src/infra/database/postgres-connection'
import ItemRepositoryDatabase from '../../src/infra/repositories/database/item-repository-database';

test('Should test item repository', async () => {
    const connection = new PostgreSQLConnectionAdapter();
    await connection.connect();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const item = await itemRepository.getById(1);
    expect(item?.description).toBe('Guitarra');
    await connection.close();
})
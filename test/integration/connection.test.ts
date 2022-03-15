import PostgreSQLConnectionAdapter from '../../src/infra/database/postgres-connection';

const connection = new PostgreSQLConnectionAdapter();

beforeEach(async () => {
    await connection.connect()
})

test('Should connect with database', async () => {
    const isAlive = await connection.isAlive();
    expect(isAlive).toBeTruthy()
})

afterEach(async () => {
    await connection.close();
})
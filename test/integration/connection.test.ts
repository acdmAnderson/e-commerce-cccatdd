import Connection from '../../src/infra/database/connection';
import PostgreSQLConnectionAdapter from '../../src/infra/database/postgres-connection';

let connection: Connection;

beforeEach(() => {
    connection = new PostgreSQLConnectionAdapter();
})

test('Should connect with database', () => {
    const conn = connection;
    expect(conn.isAlive()).toBeTruthy()
})

afterEach(async () => {
    await connection.close();
})
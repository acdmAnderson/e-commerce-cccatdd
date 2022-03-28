import PostgresConnection from "../../../util/postgres-connection";


const connection = PostgresConnection.getInstance();

beforeAll(async () => await connection.connect())

test('Should connect with database', async () => {
    const isAlive = await connection.isAlive();
    expect(isAlive).toBeTruthy()
})

afterAll(async () => await connection.close())
import Connection from '../../src/infra/database/connection';
import PostgreSQLConnectionAdapter from '../../src/infra/database/postgres-connection';

export default class PostgresConnection {

    private static readonly connection: Connection = new PostgreSQLConnectionAdapter();

    private constructor() { }

    public static getInstance(): Connection {
        if (!this.connection) return new PostgreSQLConnectionAdapter();
        return this.connection;
    }
}
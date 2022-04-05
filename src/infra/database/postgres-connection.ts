import Connection from './connection'
import { Client } from 'pg'

export default class PostgreSQLConnectionAdapter implements Connection {
    private readonly connection: Client;

    private connected: boolean = false;

    constructor () {
      this.connection = new Client({ connectionString: 'postgres://postgres:mysecretpassword@localhost:5432/postgres' })
    }

    async connect (): Promise<void> {
      await this.connection.connect()
        .then(() => {
          console.log('Database Connected')
          this.connected = true
        })
        .catch(err => console.error('connection error', err.stack))
    }

    async close (): Promise<void> {
      await this.connection.end()
        .then(() => {
          console.log('client has disconnected')
          this.connected = false
        })
        .catch(err => console.error('error during disconnection', err.stack))
    }

    async query (stmt: string, params: any): Promise<any> {
      return this.connection.query(stmt, params)
    }

    async isAlive (): Promise<boolean> {
      return this.connected
    }
}

import StockEntry from '../../../domain/entities/stock-entry'
import StockEntryRepository from '../../../domain/repositories/stock-entry.repository'
import Connection from '../../database/connection'

export default class StockEntryRepositoryDatabase implements StockEntryRepository {
  constructor (private readonly connection: Connection) { }

  async save (stockEntry: StockEntry): Promise<void> {
    await this.connection.query('INSERT INTO ccca.stock_entry (id_item, operation, quantity, created_at) values ($1, $2, $3, $4);', [stockEntry.idItem, stockEntry.operation, stockEntry.quantity, stockEntry.date])
  }

  async findAll (id: number): Promise<StockEntry[]> {
    const result = await this.connection.query('SELECT * FROM ccca.stock_entry WHERE id_item = $1', [id])
    const stockEntriesData: any[] = result.rows
    return stockEntriesData.map((data) => new StockEntry(data.id_item, data.operation, data.quantity, new Date(data.created_at)))
  }

  async clean (): Promise<void> {
    await this.connection.query('DELETE FROM ccca.stock_entry', [])
  }
}

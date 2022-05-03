import StockEntry from '../../../domain/entities/stock-entry'
import StockEntryRepository from '../../../domain/repositories/stock-entry.repository'

export default class StockEntryRepositoryMemory implements StockEntryRepository {
  private stockEntries: StockEntry[]
  constructor () {
    this.stockEntries = []
  }

  async save (stockEntry: StockEntry): Promise<void> {
    this.stockEntries.push(stockEntry)
  }

  async findAll (id: number): Promise<StockEntry[]> {
    return this.stockEntries.filter((stock) => stock.idItem === id)
  }

  async clean (): Promise<void> {
    this.stockEntries = []
  }
}

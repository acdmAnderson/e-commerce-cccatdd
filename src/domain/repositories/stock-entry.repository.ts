import StockEntry from '../entities/stock-entry'

export default interface StockEntryRepository {
    save(stockEntry: StockEntry): Promise<void>
    findAll(id: number): Promise<StockEntry[]>
    clean(): Promise<void>
}

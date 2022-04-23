import RepositoryFactory from '../../../domain/factories/repository-factory'
import StockEntryRepository from '../../../domain/repositories/stock-entry.repository'
import StockCalculator from '../../../domain/service/stock-calculator'

export default class GetStock {
  private readonly stockEntryRepository: StockEntryRepository;
  constructor (repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
  }

  async execute (idItem: number): Promise<number> {
    const stockEntries = await this.stockEntryRepository.findAll(idItem)
    const calculator = new StockCalculator()
    return calculator.calculate(stockEntries)
  }
}

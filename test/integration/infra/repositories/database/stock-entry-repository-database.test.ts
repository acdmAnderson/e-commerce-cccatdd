import StockEntry from '../../../../../src/domain/entities/stock-entry'
import StockEntryRepositoryDatabase from '../../../../../src/infra/repositories/database/stock-entry-repository-database'
import PostgresConnection from '../../../../util/postgres-connection'

const connection = PostgresConnection.getInstance()

beforeAll(async () => await connection.connect())

test('Should persist a StockEntry', async () => {
  const stockEntryRepositoryDatabase = new StockEntryRepositoryDatabase(connection)
  await stockEntryRepositoryDatabase.clean()
  await stockEntryRepositoryDatabase.save(new StockEntry(1, 'in', 6))
  await stockEntryRepositoryDatabase.save(new StockEntry(1, 'out', 2))
  await stockEntryRepositoryDatabase.save(new StockEntry(1, 'in', 2))
  const stockEntries = await stockEntryRepositoryDatabase.findAll(1)
  expect(stockEntries).toHaveLength(3)
})

afterAll(async () => await connection.close())

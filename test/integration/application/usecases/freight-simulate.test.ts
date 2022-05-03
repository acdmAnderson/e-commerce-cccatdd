import FreightSimulate from '../../../../src/application/usecases/freight-simulate/freight-simulate'
import FreightSimulateInput from '../../../../src/application/usecases/freight-simulate/freight-simulate.input'
import MemoryRepositoryFactory from '../../../../src/infra/factories/memory-repository-factory'

test('Should simulate freight', async () => {
  const freightSimulate = new FreightSimulate(new MemoryRepositoryFactory())
  const freightSimulateInput = new FreightSimulateInput([{ idItem: 1, quantity: 3 }])
  const output = await freightSimulate.execute(freightSimulateInput)
  expect(output.value).toBe(30)
})

test('Should throw if freight throws', () => {
  const freightSimulate = new FreightSimulate(new MemoryRepositoryFactory())
  const freightSimulateInput = new FreightSimulateInput([{ idItem: 4, quantity: 3 }])
  const output = freightSimulate.execute(freightSimulateInput)
  expect(output).rejects.toThrow(new Error('Item not found'))
})

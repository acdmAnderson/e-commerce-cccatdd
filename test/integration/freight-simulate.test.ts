import FreightSimulate from '../../src/application/usecases/freight-simulate/freight-simulate';
import FreightSimulateInput from '../../src/application/usecases/freight-simulate/freight-simulate.input';
import Dimension from '../../src/domain/entities/dimension';
import Item from '../../src/domain/entities/item';
import ItemRepository from '../../src/domain/repositories/item.repository';


const makeFakeItemRepository = (): ItemRepository => {
    class FakeItemRepository implements ItemRepository {
        readonly items: Item[];
        constructor() {
            const dimension = new Dimension(20, 15, 10)
            this.items = [
                new Item(1, 'any_category', 'any_description', 50, dimension, 1)
            ]
        }
        getById(id: number): Item | undefined {
            return this.items.find(item => item.idItem === id);
        }
    }
    return new FakeItemRepository();
}

test('Should simulate freight', () => {
    const freightSimulate = new FreightSimulate(makeFakeItemRepository())
    const freightSimulateInput = new FreightSimulateInput([{ idItem: 1, quantity: 3 }]);
    const output = freightSimulate.execute(freightSimulateInput);
    expect(output.value).toBe(30)
})
import Freight from '../../../domain/entities/freight';
import ItemRepository from '../../../domain/repositories/item.repository';
import FreightSimulateInput from './freight-simulate.input';
import FreightSimulateOutput from './freight-simulate.output';

export default class FreightSimulate {

    constructor(private readonly itemRepository: ItemRepository) { }

    execute(input: FreightSimulateInput): FreightSimulateOutput {
        const freight = new Freight();
        for (const { idItem, quantity } of input.items) {
            const item = this.itemRepository.getById(idItem);
            if (!item) throw new Error('Item not found');
            freight.addItem(item, quantity)
        }
        return new FreightSimulateOutput(freight.getValue());
    }
}
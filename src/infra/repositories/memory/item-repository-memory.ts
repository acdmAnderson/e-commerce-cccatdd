import Item from '../../../domain/entities/item'
import ItemRepository from '../../../domain/repositories/item.repository'

export default class ItemRepositoryMemory implements ItemRepository {
    readonly items: Item[];

    constructor () {
      this.items = [
        new Item(1, 'any_category', 'any_description', 50),
        new Item(2, 'any_category', 'any_description', 50),
        new Item(3, 'any_category', 'any_description', 50)
      ]
    }

    async getById (id: number): Promise<Item | undefined> {
      return this.items.find(item => item.idItem === id)
    }
}
